import React, { useState, useEffect } from "react";
import apiCalls from "../apiCalls";

const ColorTile = (props) => {
  const [toggle, setToggle] = useState(true);
  const [colorName, setColorName] = useState("");

  useEffect(() => {
    setColorName(props.item.name);
  }, []);

  const handleCopyColor = async (tileColor) => {
    await navigator.clipboard.writeText(tileColor);
    console.log(tileColor);
  };

  const changeColorName = () => {
    const data = {
      id: props.paletteId,
      colorId: props.item._id,
      colorName: colorName,
    };

    apiCalls.updateColorName(data);
  };

  const handleRename = (event) => {
    setColorName(event.target.value);
  };

  return (
    <div className="color">
      <div
        className="color-display"
        style={{ backgroundColor: props.item.color }}
        onClick={() => {
          handleCopyColor(props.item.color);
        }}
      ></div>
      {toggle ? (
        <div className="color-name" onDoubleClick={() => setToggle(false)}>
          {colorName}
        </div>
      ) : (
        <input
          type="text"
          value={colorName}
          onChange={handleRename}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === "Escape") {
              setToggle(true);
              changeColorName();
              event.preventDefault();
              event.stopPropagation();
            }
          }}
        />
      )}
    </div>
  );
};

export default ColorTile;
