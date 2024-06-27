"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Toast from "@/components/toast/Toast";
import styles from "./onePokemon.module.css";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  CardActionArea,
} from "@mui/material";
import { readPokemonList } from "@/services/pokemon.services";

const Pokemon = () => {
  const params = useParams();
  const { id } = params;

  const [isLoading, setIsLoading] = useState(true);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("Unexpected error. Please try later");
  const [listOfPokemons, setListOfPokemons] = useState([]);
  const [onePokemon, setOnePokemon] = useState({});

  const handleClose = () => {
    setIsToastVisible(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await readPokemonList();
      if (response.success) {
        const pokemonObj = response.response.response.filter((pokemon) => {
          return pokemon._id === id;
        });
        setListOfPokemons(response.response.response);
        setOnePokemon(pokemonObj[0]);
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

  if (Object.keys(onePokemon).length === 0) {
    return (
      <main className={styles.main}>
        <h1>Fail to load data. Please try later.</h1>
        <Toast
          isToastVisible={isToastVisible}
          handleClose={handleClose}
          isErrorToast={isError}
          message={message}
        />
      </main>
    );
  }

  console.log(listOfPokemons);
  console.log(onePokemon);
  return (
    <main className={styles.main}>
      <Card key={onePokemon._id} className={styles.card}>
        <CardHeader className={styles.cardHeader} title={onePokemon.name} />
        <CardContent className={styles.cardContent}>
          <div className={styles.cardDiv}>
            <CardMedia
              className={styles.cardMedia}
              component='img'
              alt='pokemon'
              image={onePokemon.imageUrl}
            />
            <div className={styles.cardDivStats}>
              <div>
                <p>Type: {onePokemon.type}</p>
                <p>HP: {onePokemon.hp}</p>
                <p>Defense: {onePokemon.defense}</p>
              </div>
              <div>
                <p>Attack: {onePokemon.attack}</p>
                <p>Speed: {onePokemon.speed}</p>
              </div>
            </div>
          </div>
          <div className={styles.cardDivButtons}>
            <div className={styles.cardDivButtonsInternal}>
              <Button className={styles.cardButtonEdit}>Edit</Button>
              <Button className={styles.cardButtonDelete}>Delete</Button>
            </div>
            <Button className={styles.cardButtonFight}>Fight</Button>
          </div>
        </CardContent>
      </Card>
      <Toast
        isToastVisible={isToastVisible}
        handleClose={handleClose}
        isErrorToast={isError}
        message={message}
      />
    </main>
  );
};

export default Pokemon;
