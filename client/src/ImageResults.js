import React from "react";
import GridList from "./GridList";

function ImageResults(props) {
  return (
    <div>
      <h2>Images</h2>
      <GridList images={props.images} />
    </div>
  );
}

export default ImageResults;
