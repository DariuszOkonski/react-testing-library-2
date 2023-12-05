import React, { useEffect, useState } from 'react';

function fakeFetchColors() {
  return Promise.resolve(['red', 'green', 'blue']);
}

function LoadableColorList() {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    fakeFetchColors().then((c) => setColors(c));
  });

  const renderedColors = colors.map((color) => {
    return <li key={color}>{color}</li>;
  });

  return <ul>{renderedColors}</ul>;
}

export default LoadableColorList;
