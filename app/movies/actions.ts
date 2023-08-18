'use server'

import { getMovies } from '@/lib/mongo/movies'

export async function fetchMovies({
  page = 1,
  search
}: {
  page?: number
  search?: string | undefined
}) {
  const { movies } = await getMovies({ query: search, page })
  return movies
}
