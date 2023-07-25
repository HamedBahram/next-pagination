import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import { getMovies } from '@/lib/mongo/movies'
import Search from './search'

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

  const { movies } = await getMovies({ page, limit, query: search })

  return (
    <section className='py-24'>
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

        <ul
          role='list'
          className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8'
        >
          {movies?.map(movie => (
            <li key={movie._id.toString()} className='relative'>
              <div className='group block aspect-square w-full overflow-hidden rounded-lg bg-gray-100'>
                <Image
                  src={movie.poster}
                  alt=''
                  className='object-cover group-hover:opacity-75'
                  width={300}
                  height={300}
                />
              </div>
              <p className='mt-2 block truncate font-medium'>{movie.title}</p>
              <p className='block text-sm font-medium text-gray-500'>
                {movie.cast?.join(', ')}
              </p>
              <p className='block text-sm font-medium text-gray-500'>
                {movie.year}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Page
