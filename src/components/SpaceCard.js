import React from "react"
import "../index.css"

function SpaceCard({ image, index }) {
  const direction = index % 2 ? "rtl" : "ltr"
  return (
    <div className={`${direction} card`}>
      <img className="nasa-img" src={image.url} alt="random space image" />
      <div className="container">
        <h4>
          <b>{image.title}</b>
        </h4>
        <p>{image.explanation}</p>
        <p>{image.date}</p>
      </div>
    </div>
  )
}

export default SpaceCard
