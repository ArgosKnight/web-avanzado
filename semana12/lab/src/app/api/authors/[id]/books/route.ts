import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET – Obtener los libros de un autor específico
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    // Verificar que el autor exista
    const author = await prisma.author.findUnique({
      where: { id },
    })

    if (!author) {
      return NextResponse.json(
        { error: 'Autor no encontrado' },
        { status: 404 }
      )
    }

    // Obtener los libros del autor
    const books = await prisma.book.findMany({
      where: { authorId: id },
      orderBy: {
        publishedYear: 'desc',
      },
    })

    return NextResponse.json({
      author: {
        id: author.id,
        name: author.name,
      },
      totalBooks: books.length,
      books,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Error al obtener libros del autor' },
      { status: 500 }
    )
  }
}
