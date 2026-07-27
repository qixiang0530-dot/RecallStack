import { useEffect, useRef, useState } from 'react'

export function useAsyncData<T>(loader: () => Promise<T>, refreshKey: unknown) {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()
  const loaderRef = useRef(loader)
  loaderRef.current = loader

  useEffect(() => {
    let active = true
    setLoading(true)
    loaderRef.current()
      .then((result) => {
        if (active) {
          setData(result)
          setError(undefined)
        }
      })
      .catch((reason: unknown) => {
        if (active) setError(reason instanceof Error ? reason.message : '加载失败')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [refreshKey])

  return { data, loading, error }
}
