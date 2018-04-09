import React from "react";

function DictionaryResults(props) {
  const senses = props.senses.map(sense => {
    return <li key={sense.definitions[0]}>{sense.definitions[0]}</li>;
  });

  return (
    <div>
      <h2>Definitions</h2>
      <ul>{senses}</ul>
    </div>
  );
}

export default DictionaryResults;
