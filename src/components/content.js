import ColorAdder from "./colorAdder";
import React, { useState, useEffect } from "react";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";
import apiCalls from "../apiCalls";
import ColorTile from "./colorTile";

const Content = (props) => {
  const currentIndex = props.currentIndex;
  const palettes = props.palettes.map((palette) => palette.name);
  const paletteName = palettes[currentIndex];
  const colors = props.colors;

  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(colors);
    console.log(`setting colors in content.js to: ${JSON.stringify(colors)}`);
  }, [colors]);

  const putRequest = async (nextState) => {
    const data = {
      nextState: nextState,
      id: props.palettes[currentIndex]._id,
    };

    console.log(`updating color palette set to db in content.js: ${data}`);

    await apiCalls.updateColors(data);
  };

  // target id will only be set if dragging from one dropzone to another.
  async function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    const nextState = swap(items, sourceIndex, targetIndex);
    setItems(nextState);
    console.log(`new palatte set colors in content.js: ${nextState}`);

    putRequest(nextState);
  }

  const handleNewTile = (hexCode, isHex) => {
    if (isHex) {
      const newItems = [...items, { color: hexCode, name: hexCode }];
      setItems(newItems);
      putRequest(newItems);
    }
  };

  return (
    <div className="current-palette">
      <h1>{paletteName} Palette</h1>
      <div className="color-edit">
        <ColorAdder items={items} handler={handleNewTile} />
      </div>
      <GridContextProvider onChange={onChange}>
        <GridDropZone
          id="items"
          boxesPerRow={4}
          rowHeight={150}
          style={{ height: "300px" }}
        >
          {items.map((item) => (
            <GridItem key={item._id}>
              <ColorTile
                item={item}
                paletteId={props.palettes[currentIndex]._id}
              />
            </GridItem>
          ))}
        </GridDropZone>
      </GridContextProvider>
    </div>
  );
};

export default Content;
