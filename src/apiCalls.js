import apiRequest from "./apiRequest";

const API_URL = "http://localhost:3500/palettes";

const helpers = {
  getAll: function () {
    const getOptions = {
      method: "GET",
      headers: { "Content-type": "application/json" },
    };
    return fetch(API_URL, getOptions);
  },

  updateColors: async function (data) {
    const putOptions = {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ name: data.paletteName, colors: data.nextState }),
    };

    const putUrl = `${API_URL}/${data.id}`;
    const result = await apiRequest(putUrl, putOptions);
    if (result) console.log(result);
  },
  //   updatePaletes: function () {},
  //   deleteColors: function () {},
  //   deletePalette: function () {},
  //   postColors: function () {},
  //   postPalette: function () {},
};

export default helpers;
