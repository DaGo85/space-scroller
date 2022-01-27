import { useEffect, useState } from "react"
import axios from "axios"

export default function useGetSpaceImages(startDate, endDate) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [images, setImages] = useState([])
  const apiKey = "WzbzQWjKxKCsZlOf1inUX2Xt4qLMevFm078dCEpO"
  const endDateT = endDate.format("YYYY-MM-DD")
  const startDateT = startDate.format("YYYY-MM-DD")
  const [hasMore, setHasMore] = useState(false)
  console.log(endDateT)
  console.log(startDateT)

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
      method: "GET",
      url: `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`,
      params: {
        start_date: endDateT,
        end_date: startDateT,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        res.data.reverse()
        setImages((prevImages) => {
          return [...prevImages, ...res.data]
        })
        setHasMore(res.data.length > 0)
        setLoading(false)
      })
      .catch((e) => {
        if (axios.isCancel(e)) return
        setError(true)
      })
    return () => cancel()
  }, [endDateT])

  return { loading, error, images, hasMore }
}
