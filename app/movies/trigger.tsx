'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

const Trigger = ({ limit }: { limit: number }) => {
  const router = useRouter()

  const TriggerRef = useCallback(
    (node: any) => {
      if (!node) return

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            router.push(`/movies?limit=${limit + 10}`, { scroll: false })
            observer.disconnect()
          }
        })
      })

      observer.observe(node)
    },
    [limit]
  )

  return <div ref={TriggerRef} className='h-1 w-1 bg-red-400'></div>
}

export default Trigger
