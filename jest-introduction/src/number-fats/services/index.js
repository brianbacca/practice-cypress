const axios = require("axios");

export const getRandomNumberFactService = async () => {
  try {
    const response = await axios.get(
      "http://numbersapi.com/random/year?json",
      {}
    );

    const data = await response.data;

    return data;
  } catch (e) {
    return e;
  }
};
