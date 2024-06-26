"use client";

import * as React from "react";
import styles from "./pokemonList.module.css";
import { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
} from "@mui/material";
import { readPokemonList } from "@/services/pokemon.services";
import Toast from "@/components/toast/Toast";

export const PokemonList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("Unexpected error. Please try later");
  const [listOfPokemons, setListOfPokemons] = useState([]);

  const handleClose = () => {
    setIsToastVisible(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await readPokemonList();
      if (response.success) {
        setListOfPokemons(response.response.response);
        setIsError(false);
      } else {
        setMessage(response.error);
        setIsError(true);
        setIsToastVisible(true);
      }
    };
    fetchData();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <main className={styles.main}>
        <Box sx={{ display: "flex" }}>
          <CircularProgress color='success' />
        </Box>
      </main>
    );
  }

  if (listOfPokemons.length === 0) {
    return (
      <main className={styles.main}>
        <h1>Fail to load data. Please try later.</h1>
      </main>
    );
  }

  return (
    <main>
      <h1>Pokemon Battle</h1>
      <Toast
        isToastVisible={isToastVisible}
        handleClose={handleClose}
        isErrorToast={isError}
        message={message}
      />
    </main>
  );
};

export default PokemonList;
