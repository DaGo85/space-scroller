import React from "react"
import "../index.css"

function SpaceCard({ image }) {
  console.log(image.url)
  return (
    <div className="card">
      <img src={image.url} alt="random space image" />
      <div className="container">
        <h4>
          <b>{image.title}</b>
        </h4>
        <p>{image.explanation}</p>
      </div>
    </div>
  )
}

export default SpaceCard
