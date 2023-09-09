import {useEffect, useRef} from 'react'

type Handler = () => void

export const useClickOutside = (callback: Handler) => {
  const clickRef = useRef<HTMLDivElement | null>(null)
  const handleClick = (e: MouseEvent) => {
    if (clickRef.current && !clickRef.current.contains(e.target as Node)) {
      callback()
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  })

  return clickRef
}
