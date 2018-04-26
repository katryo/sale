import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import GridList, { GridListTile, GridListTileBar } from "material-ui/GridList";
import IconButton from "material-ui/IconButton";
import InfoIcon from "@material-ui/icons/Info";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  subheader: {
    width: "100%"
  },
  cover: {
    objectFit: "cover",
    height: 160,
    width: 160
  },
  gridList: {
    width: 500
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
});

function ImageGridList(props) {
  const { classes } = props;
  const cellHeight = 160;

  return (
    <div className={classes.root}>
      <GridList cellHeight={cellHeight} className={classes.gridList} cols={3}>
        {props.images.map(image => (
          <GridListTile key={image.thumbnailUrl} cols={1}>
            <img
              src={image.thumbnailUrl}
              alt={image.thumbnailUrl}
              className={classes.other}
            />
            <GridListTileBar
              title={image.name}
              actionIcon={
                <a href={image.hostPageUrl}>
                  <IconButton className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                </a>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

ImageGridList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImageGridList);
