import React from "react";
import "../index.css";

function SpaceCard(image) {
  return (
    <div class="card">
      <img src={image.url} alt="random space image" style="width:100%" />
      <div class="container">
        <h4>
          <b>{image.name}</b>
        </h4>
        <p>{image.random}</p>
      </div>
    </div>
  );
}

export default SpaceCard;
