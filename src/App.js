import React, { useEffect, useState } from "react";
import "./App.css";
import NavMenu from "./components/navmenu";
import Content from "./components/content";
import apiRequest from "./apiRequest";

function App() {
  const API_URL = "http://localhost:3500/palettes";
  const [palettes, setPalettes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        const listItems = await response.json();
        setPalettes(listItems);
        setColors(listItems[currentIndex].colors);
        // console.log(listItems[currentIndex].colors);
      } catch (err) {
        console.log(err.stack);
      }
    };
    (async () => fetchItems())();
  }, []);

  const handleIndexChange = (indexChange) => {
    setCurrentIndex(indexChange);
    console.log(indexChange);
    setColors(palettes[indexChange].colors);
  };

  return (
    <React.Fragment>
      <NavMenu palettes={palettes} onIndexChange={handleIndexChange} />
      <Content colors={colors} />
    </React.Fragment>
  );
}

export default App;
