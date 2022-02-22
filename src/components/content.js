import ColorAdder from "./colorAdder";
import React, { useState, useEffect } from "react";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";

const Content = (props) => {
  const placeholderArray = [
    { color: "#F67280", name: "pink" },
    { color: "#F8B195", name: "skin" },
    { color: "#C06C84", name: "grape" },
    { color: "#355C7D", name: "blue" },
  ];

  const [items, setItems] = useState(placeholderArray); // supply your own state

  // target id will only be set if dragging from one dropzone to another.
  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    const nextState = swap(items, sourceIndex, targetIndex);
    setItems(nextState);
    // console.log(items);
  }

  const handleNewTile = (hexCode, isHex) => {
    if (isHex) {
      const newItems = [...items, { color: hexCode, name: hexCode }];
      setItems(newItems);
    }
    console.log(items);
  };

  const handleCopyColor = (tileColor) => {
    navigator.clipboard.writeText(tileColor);
    console.log(tileColor);
  };

  return (
    <div className="current-palette">
      <h1>Current Palette</h1>
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
