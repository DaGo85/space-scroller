import React from "react"
import "../index.css"

function SpaceCard({ image, index }) {
  const direction = index % 2 ? "rtl" : "ltr"
  const videoOrNot = image.url.includes("jpg")

  return (
    <div className={`${direction} card`}>
      {videoOrNot ? (
        <img className="nasa-img" src={image.url} alt="random space image" />
      ) : (
        <iframe src={image.url} className="nasa-img nasa-video"></iframe>
      )}
      <div className="container">
        <em>
          <p className="text">Information of {image.date}</p>{" "}
        </em>
        <h4>
          <b className="text">{image.title}</b>
        </h4>
        <p className="text">{image.explanation}</p>
      </div>
    </div>
  )
}

export default SpaceCard
