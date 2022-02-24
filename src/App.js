import React, { useEffect, useState } from "react";
import "./App.css";
import NavMenu from "./components/navmenu";
import Content from "./components/content";
import apiCalls from "./apiCalls";

function App() {
  const [palettes, setPalettes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await apiCalls.getAll();
        const listItems = await response.json();
        setPalettes(listItems);
        setColors(listItems[currentIndex].colors);
      } catch (err) {
        console.log(err.stack);
      }
    };
    (async () => fetchItems())();
  }, [currentIndex]);

  const handleIndexChange = (indexChange) => {
    setCurrentIndex(indexChange);
    console.log(indexChange);
  };

  return (
    <React.Fragment>
      <NavMenu palettes={palettes} onIndexChange={handleIndexChange} />
      <Content
        palettes={palettes}
        colors={colors}
        currentIndex={currentIndex}
      />
    </React.Fragment>
  );
}

export default App;
