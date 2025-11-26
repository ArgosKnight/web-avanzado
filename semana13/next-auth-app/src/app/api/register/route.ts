import { NextResponse } from 'next/server';
import { createUser } from '../../../../libs/user';


export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Todos los campos son obligatorios' },
        { status: 400 },
      );
    }

    const user = await createUser(name, email, password);

    return NextResponse.json(
      { message: 'Usuario registrado correctamente', user: { id: user.id, email: user.email } },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message ?? 'Error al registrar usuario' },
      { status: 400 },
    );
  }
}
