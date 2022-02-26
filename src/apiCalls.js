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
  //   updatePaletes: function () {},
  //   deleteColors: function () {},
  //   deletePalette: function () {},
  //   postColors: function () {},
  //   postPalette: function () {},
};

export default helpers;
