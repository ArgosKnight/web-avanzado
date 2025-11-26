import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { checkLoginLock, findUserByEmail, registerFailedAttempt, resetAttempts } from '../../../../../libs/user';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          throw new Error('Email y contraseña son obligatorios');
        }

        // 1. validar bloqueo por intentos
        checkLoginLock(email);

        const user = findUserByEmail(email);

        if (!user) {
          registerFailedAttempt(email);
          throw new Error('Usuario o contraseña incorrectos');
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);

        if (!isValid) {
          registerFailedAttempt(email);
          throw new Error('Usuario o contraseña incorrectos');
        }

        resetAttempts(email);

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/signin',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
