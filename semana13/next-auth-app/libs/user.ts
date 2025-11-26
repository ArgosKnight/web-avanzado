import bcrypt from 'bcryptjs';

export type AppUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string; 
};

const users: AppUser[] = [];

type LoginAttempts = {
  count: number;
  lastAttempt: number;
  lockedUntil?: number;
};

const attemptsByEmail = new Map<string, LoginAttempts>();

const MAX_ATTEMPTS = 3;
const WINDOW_MS = 5 * 60 * 1000; 
const LOCK_TIME_MS = 10 * 60 * 1000; 

export async function createUser(name: string, email: string, password: string) {
  const existing = users.find((u) => u.email === email);
  if (existing) {
    throw new Error('Ya existe un usuario con ese correo');
  }

  const hash = await bcrypt.hash(password, 10);

  const newUser: AppUser = {
    id: (users.length + 1).toString(),
    name,
    email,
    passwordHash: hash,
  };

  users.push(newUser);
  return newUser;
}

export function findUserByEmail(email: string): AppUser | undefined {
  return users.find((u) => u.email === email);
}

export function checkLoginLock(email: string): void {
  const info = attemptsByEmail.get(email);
  if (!info) return;

  const now = Date.now();

  if (info.lockedUntil && now < info.lockedUntil) {
    throw new Error('Cuenta bloqueada temporalmente por intentos fallidos');
  }

  if (now - info.lastAttempt > WINDOW_MS) {
    attemptsByEmail.delete(email);
  }
}

export function registerFailedAttempt(email: string): void {
  const now = Date.now();
  const info = attemptsByEmail.get(email);

  if (!info) {
    attemptsByEmail.set(email, { count: 1, lastAttempt: now });
    return;
  }

  if (now - info.lastAttempt > WINDOW_MS) {
    attemptsByEmail.set(email, { count: 1, lastAttempt: now });
    return;
  }

  info.count += 1;
  info.lastAttempt = now;

  if (info.count >= MAX_ATTEMPTS) {
    info.lockedUntil = now + LOCK_TIME_MS;
  }

  attemptsByEmail.set(email, info);
}

export function resetAttempts(email: string): void {
  attemptsByEmail.delete(email);
}
