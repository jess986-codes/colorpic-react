const express = require("express");
const router = express.Router();
const palettes = require("./paletteRouter");

router.get("", palettes.getAll);

router.put("/:id", palettes.updateColors);
router.put("/:id/:colorId", palettes.updateColorName);

module.exports = router;
