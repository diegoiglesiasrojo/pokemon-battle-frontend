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
      const messageError = e?.response?.data?.error
        ? e?.response?.data?.error
        : e?.response?.data?.validationError
        ? e?.response?.data?.validationError
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

export const updatePokemon = async (updatedPokemon, pokemonId) => {
  return await axios
    .put(`http://localhost:4000/api/pokemonid/${pokemonId}`, {
      ...updatedPokemon,
    })
    .then((response) => {
      const res = {
        success: true,
        response: response.data,
      };
      return res;
    })
    .catch((e) => {
      const messageError = e?.response?.data?.error
        ? e?.response?.data?.error
        : e?.response?.data?.validationError
        ? e?.response?.data?.validationError
        : "Unexpected error. Please try later";

      const response = {
        success: false,
        error: messageError,
      };
      return response;
    });
};

export const deletePokemon = async (pokemonId) => {
  return await axios
    .delete(`http://localhost:4000/api/pokemonid/${pokemonId}`)
    .then((response) => {
      const res = {
        success: true,
        response: response.data,
      };
      return res;
    })
    .catch((e) => {
      const messageError = e?.response?.data?.error
        ? e?.response?.data?.error
        : e?.response?.data?.validationError
        ? e?.response?.data?.validationError
        : "Unexpected error. Please try later";

      const response = {
        success: false,
        error: messageError,
      };
      return response;
    });
};

export const readPokemonById = async (pokemonId) => {
  return await axios
    .get(`http://localhost:4000/api/pokemonid/${pokemonId}`)
    .then((response) => {
      const res = {
        success: true,
        response: response.data,
      };
      return res;
    })
    .catch((e) => {
      const messageError = e?.response?.data?.error
        ? e?.response?.data?.error
        : e?.response?.data?.validationError
        ? e?.response?.data?.validationError
        : "Unexpected error. Please try later";

      const response = {
        success: false,
        error: messageError,
      };
      return response;
    });
};
