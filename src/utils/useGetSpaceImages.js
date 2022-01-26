import { useEffect, useState } from "react"
import axios from "axios"

export default function useGetSpaceImages(startDate, endDate) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [images, setImages] = useState([])
  const apiKey = "WzbzQWjKxKCsZlOf1inUX2Xt4qLMevFm078dCEpO"
  const endDateT = endDate.format("YYYY-MM-DD")
  const startDateT = startDate.format("YYYY-MM-DD")
  console.log(endDateT)
  console.log(startDateT)
  console.log(startDate + "test")
  console.log(endDate + "test2")
  //const endDate = "2022-01-22"
  //const startDate = "2022-01-15"

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

        setLoading(false)
      })
      .catch((e) => {
        if (axios.isCancel(e)) return
        setError(true)
      })
    return () => cancel()
  }, [endDate])

  return { loading, error, images }
}
