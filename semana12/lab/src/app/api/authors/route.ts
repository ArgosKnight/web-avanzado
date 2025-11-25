import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// GET – Obtener todos los autores
export async function GET() {
  try {
    const authors = await prisma.author.findMany({
      include: {
        books: true,
        _count: {
          select: { books: true },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json(authors)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Error al obtener autores' },
      { status: 500 }
    )
  }
}

// POST – Crear un nuevo autor
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, bio, nationallity, birthYear } = body

    // Validación básica
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      )
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Crear autor
    const author = await prisma.author.create({
  data: {
    name,
    email,
    bio,
    nationallity,
    birthYear: parseInt(birthYear)
  },
  include: {
    books: true,
  },
})

    return NextResponse.json(author, { status: 201 })
  } catch (error: any) {
    // Error de email duplicado único (Prisma: P2002)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'El email ya está registrado' },
        { status: 409 }
      )
    }

    console.log(error)
    return NextResponse.json(
      { error: 'Error al crear autor' },
      { status: 500 }
    )
  }
}
