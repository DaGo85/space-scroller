import React, { useState, useRef, useCallback } from "react"
import "./App.css"
import useGetSpaceImages from "./utils/useGetSpaceImages"
import SpaceCard from "./components/SpaceCard"

function App() {
  const [pageNumber, setPageNumber] = useState(1)

  const { images, loading, error } = useGetSpaceImages(pageNumber)

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
    <>
      {images.map((image, index) => {
        if (images.length === index + 1) {
          return (
            <div ref={lastImageElementRef} key={image}>
              <SpaceCard image={image} />
            </div>
          )
        } else {
          return <SpaceCard image={image} key={image} />
        }
      })}
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </>
  )
}

export default App
