import clsx from 'clsx'
import Link from 'next/link'
import { Suspense } from 'react'
import { v4 as uuid } from 'uuid'

import { getMovies } from '@/lib/mongo/movies'

import Search from './search'
import Movies from './movies'
import Await from './await'
import Skeleton from './skeleton'

const Page = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const page =
    typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
  const limit =
    typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 10

  const search =
    typeof searchParams.search === 'string' ? searchParams.search : undefined

  const promise = getMovies({ page, limit, query: search })

  return (
    <section className='py-24' key={uuid()}>
      <div className='container'>
        <div className='mb-12 flex items-center justify-between gap-x-16'>
          <h1 className='text-3xl font-bold'>Movies</h1>

          <div className='grow'>
            <Search search={search} />
          </div>

          <div className='flex space-x-6'>
            <Link
              href={{
                pathname: '/movies',
                query: {
                  ...(search ? { search } : {}),
                  page: page > 1 ? page - 1 : 1
                }
              }}
              className={clsx(
                'rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800',
                page <= 1 && 'pointer-events-none opacity-50'
              )}
            >
              Previous
            </Link>
            <Link
              href={{
                pathname: '/movies',
                query: {
                  ...(search ? { search } : {}),
                  page: page + 1
                }
              }}
              className='rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800'
            >
              Next
            </Link>
          </div>
        </div>

        <Suspense fallback={<Skeleton />}>
          <Await promise={promise}>
            {({ movies }) => <Movies movies={movies} />}
          </Await>
        </Suspense>
      </div>
    </section>
  )
}

export default Page
