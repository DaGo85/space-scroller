import { useEffect, useState } from "react"
import axios from "axios"

export default function useGetSpaceImages(startDate, endDate) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [images, setImages] = useState([])
  const apiKey = "WzbzQWjKxKCsZlOf1inUX2Xt4qLMevFm078dCEpO"
  useEffect(() => {
    setImages([])
  }, [])

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
      method: "GET",
      url: `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`,
      //params: { start_date, end_date: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setImages((prevImages) => {
          return [...new Set([...prevImages, ...res.data.docs.map])]
        })
        setLoading(false)
      })
      .catch((e) => {
        if (axios.isCancel(e)) return
        setError(true)
      })
    return () => cancel()
  }, [query, pageNumber])

  return { loading, error, books }
}
