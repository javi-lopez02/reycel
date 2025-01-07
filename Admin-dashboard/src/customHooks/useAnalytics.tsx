import { useEffect, useState } from "react"
import { Analytics } from "../type"
import { getAnalytics } from "../services/analytics"

function useAnalytics() {
  const [analytics, setAnalytics] = useState<Analytics | null >(null)
  const [error, setError] = useState<Array<string> |null>(null)
  const [loading, setLoading] = useState(false)


  useEffect(()=>{
    setLoading(true)
    setError(null)
    getAnalytics().then((res)=>{
      setAnalytics(res.data)
    }).catch((err)=>{
      console.log(err)
      setError(err)
    }).finally(()=>{
      setLoading(false)
    })
  },[])

  return {analytics, error, loading}

}

export default useAnalytics