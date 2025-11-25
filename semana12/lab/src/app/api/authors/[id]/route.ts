import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET – Obtener un autor específico por ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    const author = await prisma.author.findUnique({
      where: { id },
      include: {
        books: {
          orderBy: { publishedYear: 'desc' },
        },
        _count: {
          select: { books: true },
        },
      },
    })

    if (!author) {
      return NextResponse.json(
        { error: 'Autor no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(author)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Error al obtener autor' },
      { status: 500 }
    )
  }
}

// PUT – Actualizar un autor
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const { name, email, bio, nationallity, birthYear } = body

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Email inválido' },
          { status: 400 }
        )
      }
    }

    const author = await prisma.author.update({
      where: { id },
      data: {
        name,
        email,
        bio,
        nationallity,
        birthYear: parseInt(birthYear),
      },
      include: {
        books: true,
      },
    })

    return NextResponse.json(author)
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Autor no encontrado' },
        { status: 404 }
      )
    }

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'El email ya está registrado' },
        { status: 409 }
      )
    }

    console.log(error)
    return NextResponse.json(
      { error: 'Error al actualizar autor' },
      { status: 500 }
    )
  }
}

// DELETE – Eliminar un autor
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    await prisma.author.delete({
      where: { id },
    })

    return NextResponse.json({
      message: 'Autor eliminado correctamente',
    })
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Autor no encontrado' },
        { status: 404 }
      )
    }

    console.log(error)
    return NextResponse.json(
      { error: 'Error al eliminar autor' },
      { status: 500 }
    )
  }
}
