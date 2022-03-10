import React, { useEffect, useState } from "react";
import "./App.css";
import NavMenu from "./components/navmenu";
import Content from "./components/content";
import apiCalls from "./apiCalls";

function App() {
  const [palettes, setPalettes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [colors, setColors] = useState([]);
  const [sets, setSets] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await apiCalls.getAll();
        const listItems = await response.json();
        setPalettes(listItems);
        setColors(listItems[currentIndex].colors);
        setSets(listItems.map((palette) => palette.name));
        console.log(
          `grabbing updated colors in app.js ${listItems[currentIndex].colors}`
        );
      } catch (err) {
        console.log(err.stack);
      }
    };
    (async () => fetchItems())();
  }, [currentIndex]);

  const handleIndexChange = (indexChange) => {
    setCurrentIndex(indexChange);
    console.log(`index changed to: ${indexChange}`);
  };

  return (
    <React.Fragment>
      <NavMenu sets={sets} onIndexChange={handleIndexChange} />
      <Content
        palettes={palettes}
        colors={colors}
        currentIndex={currentIndex}
      />
    </React.Fragment>
  );
}

export default App;
