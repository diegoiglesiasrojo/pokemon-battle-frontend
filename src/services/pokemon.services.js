import axios from "axios";

export const createNewPokemon = async (newPokemon) => {
  return await axios
    .post("http://localhost:4000/api/pokemon", { ...newPokemon })
    .then((response) => {
      const res = {
        success: true,
        response: response.data,
      };
      return res;
    })
    .catch((e) => {
      const messageError = e.response.data.error
        ? e.response.data.error
        : e.response.data.validationError
        ? e.response.data.validationError
        : "Unexpected error. Please try later";

      const response = {
        success: false,
        error: messageError,
      };
      return response;
    });
};

export const readPokemonList = async () => {
  return await axios
    .get("http://localhost:4000/api/pokemon")
    .then((response) => {
      const res = {
        success: true,
        response: response.data,
      };
      return res;
    })
    .catch((e) => {
      const messageError = e?.response?.data?.error
        ? e.response?.data?.error
        : e.response?.data?.validationError
        ? e.response?.data?.validationError
        : "Unexpected error. Please try later";

      const response = {
        success: false,
        error: messageError,
      };
      return response;
    });
};
