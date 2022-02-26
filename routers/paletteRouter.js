const mongoose = require("mongoose");
const Palette = require("../models/palette");

module.exports = {
  getAll: function (req, res) {
    Palette.find(function (err, palettes) {
      if (err) {
        return res.json(err);
      } else {
        return res.json(palettes);
      }
    });
  },
  updateColors: function (req, res) {
    Palette.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      function (err, palette) {
        if (err) return res.status(400).json(err);
        if (!palette) return res.status(404).json(err);
        res.json(palette);
      }
    );
  },
};
