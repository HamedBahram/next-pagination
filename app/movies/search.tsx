'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useDebounce } from 'use-debounce'

const Search = () => {
  const router = useRouter()

  const [text, setText] = useState('')
  const [query] = useDebounce(text, 750)

  useEffect(() => {
    if (!query) {
      router.push(`/movies`)
    } else {
      router.push(`/movies?search=${query}`)
    }
  }, [query])

  return (
    <div className='relative rounded-md shadow-sm'>
      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
        <MagnifyingGlassIcon
          className='h-5 w-5 text-gray-400'
          aria-hidden='true'
        />
      </div>
      <input
        type='email'
        className='block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        placeholder='you@example.com'
        value={text}
        onChange={e => setText(e.target.value)}
      />
    </div>
  )
}

export default Search
