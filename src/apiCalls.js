const helpers = {
  getAll: function () {
    const getOptions = {
      method: "GET",
      headers: { "Content-type": "application/json" },
    };
    return fetch("/palettes", getOptions);
  },

  updateColors: async function (data) {
    const putOptions = {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ colors: data.nextState }),
    };

    await fetch(`/palettes/${data.id}`, putOptions);
  },
  updateColorName: async function (data) {
    const putOptions = {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ colorName: data.colorName }),
    };

    await fetch(`/palettes/${data.id}/${data.colorId}`, putOptions);
  },
  //   updatePaletes: function () {},
  //   deleteColors: function () {},
  //   deletePalette: function () {},
  postPalette: async function (data) {
    const postOptions = {
      method: "POST",
      headers: { "Content-type": "application/json" },
    };

    await fetch(`/palettes/${data.paletteName}`, postOptions);
  },
};

export default helpers;
