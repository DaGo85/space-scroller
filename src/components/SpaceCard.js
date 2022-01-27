import React from "react"
import "../index.css"

function SpaceCard({ image, index }) {
  const direction = index % 2 ? "rtl" : "ltr"
  const videoOrNot = image.url.includes("jpg")
  console.log(videoOrNot)
  console.log(image.url)

  return (
    <div className={`${direction} card`}>
      {videoOrNot ? (
        <img className="nasa-img" src={image.url} alt="random space image" />
      ) : (
        <iframe src={image.url} className="nasa-img nasa-video"></iframe>
      )}
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
