import React from "react";
import Typography from "material-ui/Typography";
import DictEntry from "./DictEntry";

function DictionaryResults(props) {
  const entries = props.dictEntries
    .filter(entry => entry.senses !== undefined)
    .map(entry => (
      <div key={entry.id}>
        <DictEntry
          senses={entry.senses}
          pronunciations={entry.pronunciations}
        />
      </div>
    ));

  return (
    <div>
      <Typography variant="title" gutterBottom>
        Definitions
      </Typography>
      {entries}
    </div>
  );
}

export default DictionaryResults;
