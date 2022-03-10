import React, { useState, useEffect } from "react";
import paletteIcon from "../assets/images/palette-solid.svg";
import apiCalls from "../apiCalls";

const NavMenu = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [paletteName, setPaletteName] = useState("");
  const sets = props.sets;
  const [palettes, setPalettes] = useState([]);

  useEffect(() => {
    console.log(`these are the sets in navmenu.js: ${props.palettes}`);
    setPalettes(sets);
  }, [sets]);

  const handleClassSelected = (index) => {
    const classSelected = "set";
    return index === currentIndex ? `${classSelected} selected` : classSelected;
  };

  const handleSetClick = (index) => {
    setCurrentIndex(index);
    props.onIndexChange(index);
  };

  const handleRename = (event) => {
    setPaletteName(event.target.value);
  };

  const handleNewSet = () => {
    setPalettes([...palettes, paletteName]);
    const data = { paletteName: paletteName };
    apiCalls.postPalette(data);
  };

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

      {toggle ? (
        <input
          className="new-palette-input"
          autoFocus
          onBlur={(event) => {
            setToggle(!toggle);
            event.preventDefault();
            event.stopPropagation();
          }}
          type="text"
          value={paletteName}
          onChange={handleRename}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === "Escape") {
              setToggle(!toggle);
              handleNewSet();
              event.preventDefault();
              event.stopPropagation();
            }
          }}
        />
      ) : (
        ""
      )}

      <button
        onClick={() => {
          setToggle(!toggle);
        }}
        className="button-right"
      >
        NEW
      </button>
    </nav>
  );
};

export default NavMenu;
