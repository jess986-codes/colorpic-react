import ColorAdder from "./colorAdder";
import React, { useState, useEffect } from "react";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";
import apiCalls from "../apiCalls";

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
      paletteName: paletteName,
      id: props.palettes[currentIndex].id,
    };
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

  const handleCopyColor = async (tileColor) => {
    await navigator.clipboard.writeText(tileColor);
    console.log(tileColor);
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
          boxesPerRow={3}
          rowHeight={150}
          style={{ height: "300px" }}
        >
          {items.map((item, index) => (
            <GridItem key={index}>
              <div className="color">
                <div
                  className="color-display"
                  style={{ backgroundColor: item.color }}
                  onClick={() => {
                    handleCopyColor(item.color);
                  }}
                ></div>
                <div className="color-name">{item.name}</div>
              </div>
            </GridItem>
          ))}
        </GridDropZone>
      </GridContextProvider>
    </div>
  );
};

export default Content;
