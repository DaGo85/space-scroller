import React, { useState, useRef, useCallback } from "react"
import "./App.css"
import useGetSpaceImages from "./utils/useGetSpaceImages"
import SpaceCard from "./components/SpaceCard"

function App() {
  const [pageNumber, setPageNumber] = useState(1)
  const [startDate, setStartDate] = useState(Date.now())
  const [endDate, setEndDate] = useState(Date.now())

  const { images, loading, error } = useGetSpaceImages(startDate)

  const observer = useRef()
  const lastImageElementRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading]
  )

  return (
    <div className="app-container">
      <h1>SPACE SCROLLER</h1>
      <h2>An infinite scroller through space and stars!</h2>
      {images.map((image, index) => {
        if (images.length === index + 1) {
          return (
            <div ref={lastImageElementRef} key={image.date}>
              <SpaceCard image={image} />
            </div>
          )
        } else {
          return <SpaceCard image={image} key={image.date} />
        }
      })}
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </div>
  )
}

export default App
