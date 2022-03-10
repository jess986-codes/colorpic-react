import React, { useState } from "react";

const ColorAdder = (props) => {
  const [hexCode, setHexCode] = useState("");
  const [color, setColor] = useState("#6195ED");
  const validHex = new RegExp("^#[0-9a-fA-F]{6}$");
  const [isHex, setIsHex] = useState(false);

  const validateHex = (text) => {
    setHexCode(text);
    if (validHex.test(text)) {
      console.log(text);
      setColor(text);
      setIsHex(true);
    } else {
      setColor("#FFFFFF");
      setIsHex(false);
    }
  };

  const handlePaste = async () => {
    await navigator.clipboard
      .readText()
      .then((clipText) => validateHex(clipText));
  };

  const handleChange = (event) => {
    validateHex(event.target.value);
  };

  const onHandleNewTile = () => {
    props.handler(hexCode, isHex);
    setHexCode("");
  };

  return (
    <div className="add-color">
      <div className="paste-color">
        <div className="color-preview" style={{ backgroundColor: color }}></div>
        <div className="color-input">
          <input
            className="color-adder-input"
            type="text"
            value={hexCode}
            onChange={handleChange}
            placeholder="Enter color hex code"
          />
          <button className="paste-button" onClick={handlePaste}>
            Paste
          </button>
        </div>
      </div>
      <button className="add-button button-right" onClick={onHandleNewTile}>
        ADD
      </button>
    </div>
  );
};

export default ColorAdder;
