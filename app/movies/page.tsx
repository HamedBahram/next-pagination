import { Suspense } from 'react'

import { fetchMovies } from './actions'

import Search from './search'
import Movies from './movies'
import Trigger from './trigger'

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
          role='list'
          className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8'
        >
          <Movies movies={movies} />
          <Trigger search={search} />
        </ul>
      </div>
    </section>
  )
}

export default Page
