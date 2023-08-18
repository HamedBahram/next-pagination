import Image from 'next/image'
import { Document } from 'mongodb'

export default function Movies({ movies }: { movies: Document[] | undefined }) {
  return (
    <>
      {movies?.map(movie => (
        <li key={movie._id.toString()} className='relative'>
          <div className='group aspect-square w-full overflow-hidden rounded-lg bg-gray-100'>
            <Image
              src={movie.poster}
              alt=''
              className='w-full object-cover group-hover:opacity-75'
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
    </>
  )
}
