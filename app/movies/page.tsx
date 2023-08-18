import { v4 as uuid } from 'uuid'

import { fetchMovies } from './actions'

import Search from './search'
import InfiniteScrollMovies from './infinite-scroll-movies'

const Page = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const search =
    typeof searchParams.search === 'string' ? searchParams.search : undefined

  const movies = await fetchMovies({ search })

  return (
    <section className='py-24'>
      <div className='container'>
        <div className='mb-12 flex items-center justify-between gap-x-16'>
          <h1 className='flex-1 text-3xl font-bold'>Movies</h1>

          <div className='flex-1'>
            <Search search={search} />
          </div>
        </div>

        <ul
          key={uuid()}
          role='list'
          className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8'
        >
          <InfiniteScrollMovies search={search} initialMovies={movies} />
        </ul>
      </div>
    </section>
  )
}

export default Page
