import React, { useState, useEffect } from "react";
import apiCalls from "../apiCalls";

const ColorTile = (props) => {
  const [toggle, setToggle] = useState(true);
  const [colorName, setColorName] = useState("");
  let [currentColor, setCurrentColor] = useState("");

  useEffect(() => {
    setColorName(props.item.name);
    setCurrentColor(props.item.name);
  }, []);

  const handleCopyColor = async (tileColor) => {
    await navigator.clipboard.writeText(tileColor);
    console.log(tileColor);
  };

  const changeColorName = () => {
    console.log(
      `current color is: ${currentColor} \nnew color is: ${colorName}`
    );
    if (currentColor !== colorName) {
      console.log("color has changed");
      setCurrentColor(colorName);

      const data = {
        id: props.paletteId,
        colorId: props.item._id,
        colorName: colorName,
      };

      apiCalls.updateColorName(data);
    }
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
          autoFocus
          onBlur={(event) => {
            setToggle(!toggle);
            changeColorName();
            event.preventDefault();
            event.stopPropagation();
          }}
          value={colorName}
          onChange={handleRename}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === "Escape") {
              setToggle(!toggle);
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
