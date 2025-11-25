import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const search = url.searchParams.get('search') ?? ''
    const genre = url.searchParams.get('genre')
    const authorName = url.searchParams.get('authorName') ?? ''
    const page = parseInt(url.searchParams.get('page') ?? '1')
    const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '10'), 50)

    const sortBy = url.searchParams.get('sortBy') ?? 'createdAt'
    const order = url.searchParams.get('order') ?? 'desc'

    const skip = (page - 1) * limit

    // Construcción del WHERE dinámico
    const whereClause: any = {
      AND: [
        search
          ? { title: { contains: search, mode: 'insensitive' } }
          : undefined,

        genre ? { genre } : undefined,

        authorName
          ? {
              author: {
                name: {
                  contains: authorName,
                  mode: 'insensitive',
                },
              },
            }
          : undefined,
      ].filter(Boolean),
    }

    // Total de resultados
    const total = await prisma.book.count({ where: whereClause })

    // Query principal con filtros + orden + paginación
    const books = await prisma.book.findMany({
      where: whereClause,
      include: {
        author: {
          select: { id: true, name: true },
        },
      },
      orderBy: {
        [sortBy]: order,
      },
      skip,
      take: limit,
    })

    // Calcular paginación
    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      data: books,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Error en la búsqueda de libros' },
      { status: 500 }
    )
  }
}
