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
  }, [colors]);

  const putRequest = async (nextState) => {
    const data = {
      nextState: nextState,
      id: props.palettes[currentIndex]._id,
    };

    console.log(data);

    await apiCalls.updateColors(data);
  };

  // target id will only be set if dragging from one dropzone to another.
  async function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    const nextState = swap(items, sourceIndex, targetIndex);
    setItems(nextState);
    console.log(nextState);

    putRequest(nextState);
  }

  const handleNewTile = (hexCode, isHex) => {
    if (isHex) {
      const newItems = [...items, { color: hexCode, name: hexCode }];
      setItems(newItems);
      putRequest(newItems);
    }
    console.log(items);
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
          {items.map((item, index) => (
            <GridItem key={index}>
              <ColorTile color={item.color} name={item.name} />
            </GridItem>
          ))}
        </GridDropZone>
      </GridContextProvider>
    </div>
  );
};

export default Content;
