import React from "react";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";

const styles = {
  sense: {
    marginBottom: 100
  }
};

function DefinitionsList(props) {
  const definitions = props.definitions.map(definition => (
    <li>
      <Typography>{definition}</Typography>
    </li>
  ));
  return <ul>{definitions}</ul>;
}

function DictEntry(props) {
  const { classes } = props;

  const senses = props.senses
    .filter(sense => sense.definitions !== undefined)
    .map(sense => (
      <div>
        <DefinitionsList definitions={sense.definitions} />
      </div>
    ));
  const pronunciations = props.pronunciations.map(pron => (
    <div>
      <audio controls>
        <source src={pron.audioFile} type="audio/mpeg" />
      </audio>
      <Typography variant="caption" component="p">
        {pron.phoneticSpelling}
      </Typography>
    </div>
  ));

  return (
    <div className={classes.sense}>
      <div>{senses}</div>
      <div>{pronunciations}</div>
    </div>
  );
}

export default withStyles(styles)(DictEntry);
