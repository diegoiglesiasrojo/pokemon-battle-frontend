import axios from "axios";

export const createNewPokemon = async (newPokemon) => {
  return await axios
    .post("http://localhost:4000/api/pokemon", { ...newPokemon })
    .then((response) => {
      console.log(response);
      const res = {
        success: true,
        response: response.data,
      };
      return res;
    })
    .catch((e) => {
      console.log(e);
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
