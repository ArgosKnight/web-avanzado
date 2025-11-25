import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: authorId } = await context.params

    // 1. Verificar que el autor exista
    const author = await prisma.author.findUnique({
      where: { id: authorId },
    })

    if (!author) {
      return NextResponse.json(
        { error: "Autor no encontrado" },
        { status: 404 }
      )
    }

    // 2. Obtener TODOS los libros del autor
    const books = await prisma.book.findMany({
      where: { authorId },
      orderBy: {
        publishedYear: "asc",
      },
    })

    if (books.length === 0) {
      return NextResponse.json({
        totalBooks: 0,
        firstYear: null,
        lastYear: null,
        averagePages: null,
        genres: [],
        maxPagesBook: null,
        minPagesBook: null,
      })
    }

    // ========== Estadísticas ==========

    const totalBooks = books.length
    const firstYear = books[0].publishedYear
    const lastYear = books[books.length - 1].publishedYear

    const validPages = books
      .map((b) => b.pages)
      .filter((p): p is number => p !== null)

    const averagePages =
      validPages.length > 0
        ? Math.round(validPages.reduce((a, b) => a + b, 0) / validPages.length)
        : null

    const genres = [
      ...new Set(
        books
          .map((b) => b.genre)
          .filter((g): g is string => g !== null)
      ),
    ]

    const maxPagesBook = books.reduce((max, b) =>
      max.pages! > (b.pages ?? 0) ? max : b
    )

    const minPagesBook = books.reduce((min, b) =>
      (min.pages ?? Infinity) < (b.pages ?? Infinity) ? min : b
    )

    return NextResponse.json({
      totalBooks,
      firstYear,
      lastYear,
      averagePages,
      genres,
      maxPagesBook,
      minPagesBook,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Error al obtener estadísticas" },
      { status: 500 }
    )
  }
}
