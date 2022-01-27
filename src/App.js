import React, { useState, useRef, useCallback } from "react"
import "./App.css"
import useGetSpaceImages from "./utils/useGetSpaceImages"
import SpaceCard from "./components/SpaceCard"
import dayjs from "dayjs"

function App() {
  const [startDate, setStartDate] = useState(dayjs())
  const [endDate, setEndDate] = useState(startDate.subtract(5, "days"))
  console.log(startDate + "date")
  console.log(endDate + "enddate")
  const { images, loading, error, hasMore } = useGetSpaceImages(
    startDate,
    endDate
  )

  const observer = useRef()
  const lastImageElementRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setStartDate(endDate.subtract(1, "days"))
          setEndDate((endDate) => endDate.subtract(5, "days"))
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  return (
    <div className="app-container">
      <h1>SPACE SCROLLER</h1>
      <h2>An infinite scroller through space and stars!</h2>
      {images.map((image, index) => {
        if (images.length === index + 1) {
          return (
            <div ref={lastImageElementRef} key={Math.random()}>
              <SpaceCard image={image} index={index} />
            </div>
          )
        } else {
          return <SpaceCard image={image} index={index} key={Math.random()} />
        }
      })}
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </div>
  )
}

export default App
