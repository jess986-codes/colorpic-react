import React, { useState } from "react";
import paletteIcon from "../assets/images/palette-solid.svg";

const NavMenu = (props) => {
  const palettes = props.palettes.map((palette) => palette.name);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClassSelected = (index) => {
    const classSelected = "set";
    return index === currentIndex ? `${classSelected} selected` : classSelected;
  };

  const handleSetClick = (index) => {
    setCurrentIndex(index);
    props.onIndexChange(index);
  };

  const handleNewSet = () => {};

  return (
    <nav>
      <div className="palette-menu">
        <img src={paletteIcon} alt="palette icon" /> PALETTES
      </div>
      <div className="palette-sets">
        {palettes.map((palette, index) => (
          <div
            onClick={() => {
              handleSetClick(index);
            }}
            key={index}
            className={handleClassSelected(index)}
          >
            {palette}
          </div>
        ))}
      </div>
      <button onClick={handleNewSet} className="button-right">
        NEW
      </button>
    </nav>
  );
};

export default NavMenu;
