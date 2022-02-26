import React, { useState, useEffect } from "react";

const ColorTile = (props) => {
  const [toggle, setToggle] = useState(true);

  const handleCopyColor = async (tileColor) => {
    await navigator.clipboard.writeText(tileColor);
    console.log(tileColor);
  };
  return (
    <div className="color">
      <div
        className="color-display"
        style={{ backgroundColor: props.color }}
        onClick={() => {
          handleCopyColor(props.color);
        }}
      ></div>
      {toggle ? (
        <div className="color-name" onDoubleClick={() => setToggle(false)}>
          {props.name}
        </div>
      ) : (
        <input
          type="text"
          value={props.name}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === "Escape") {
              setToggle(true);
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
