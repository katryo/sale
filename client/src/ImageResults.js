import React from "react";
import GridList from "./GridList";
import Typography from "material-ui/Typography";

function ImageResults(props) {
  return (
    <div>
      <Typography variant="title" gutterBottom>
        Images
      </Typography>
      <GridList images={props.images} />
    </div>
  );
}

export default ImageResults;
