"use client";

import * as React from "react";
import styles from "./fight.module.css";
import { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  CardActionArea,
  Button,
} from "@mui/material";
import { readPokemonList } from "@/services/pokemon.services";
import { createBattle } from "@/services/battleList.services";
import Toast from "@/components/toast/Toast";
import { useParams } from "next/navigation";
import Image from "next/image";

export const Fight = () => {
  const params = useParams();
  const { id } = params;

  const [isLoading, setIsLoading] = useState(true);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("Unexpected error. Please try later");
  const [listOfPokemons, setListOfPokemons] = useState([]);
  const [firstPokemon, setFirstPokemon] = useState({});
  const [winner, setWinner] = useState("");

  const handleClose = () => {
    setIsToastVisible(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await readPokemonList();
      if (response.success) {
        const onePokemon = response.response.response.filter((pokemon) => {
          return pokemon._id === id;
        });

        const listOfPokemonsWithoutOnePokemon =
          response.response.response.filter((pokemon) => {
            return pokemon._id !== id;
          });
        setFirstPokemon(onePokemon[0]);
        setListOfPokemons(listOfPokemonsWithoutOnePokemon);
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

  const generateFight = async (secondPokemonName) => {
    setIsLoading(true);

    let secondPokemon = "";
    if (secondPokemonName === "") {
      secondPokemon =
        listOfPokemons[Math.round(Math.random() * (listOfPokemons.length - 1))]
          .name;
    } else {
      secondPokemon = secondPokemonName;
    }
    const dataToSend = {
      firstPokemon: firstPokemon.name,
      secondPokemon,
    };

    const response = await createBattle(dataToSend);
    if (response.success) {
      setWinner(response.response.response.winner);
      setIsError(false);
    } else {
      setMessage(response.error);
      setIsError(true);
      setIsToastVisible(true);
    }

    setIsLoading(false);
  };

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
        <Toast
          isToastVisible={isToastVisible}
          handleClose={handleClose}
          isErrorToast={isError}
          message={message}
        />
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <h1>Fight Zone</h1>
      <section
        className={styles.sectionFirst}
        style={{ backgroundImage: "url(/battle-arena.webp)" }}
      >
        <Card
          key={firstPokemon._id}
          sx={{ maxWidth: 290 }}
          className={styles.cardFirstPokemon}
        >
          <CardHeader
            className={styles.cardHeader}
            title={firstPokemon.name}
            style={{ padding: 0 }}
          />
          <CardContent>
            <CardMedia
              component='img'
              alt='pokemon'
              image={firstPokemon.imageUrl}
            />
          </CardContent>
        </Card>
        <p>vs</p>
        <Button
          onClick={() => {
            generateFight("");
          }}
          className={styles.cardButtonRandom}
        >
          Random
        </Button>
      </section>
      <section className={styles.sectionSecond}>
        <p>or choose another fighter...</p>
        <article className={styles.articleSecondSection}>
          {listOfPokemons.map((pokemon) => {
            return (
              <Card
                key={pokemon._id}
                sx={{ maxWidth: 290 }}
                className={styles.cardSecondSection}
              >
                <CardActionArea
                  onClick={() => {
                    generateFight(pokemon.name);
                  }}
                  className={styles.cardActionSecondSection}
                >
                  <CardHeader
                    className={styles.cardHeaderSecondSection}
                    title={pokemon.name}
                  />
                  <CardContent>
                    <CardMedia
                      component='img'
                      alt='pokemon'
                      height='120'
                      image={pokemon.imageUrl}
                    />
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </article>
      </section>
      <Toast
        isToastVisible={isToastVisible}
        handleClose={handleClose}
        isErrorToast={isError}
        message={message}
      />
      <section
        style={{ display: winner === "" ? "none" : "flex" }}
        className={styles.winnerBackgroundSection}
      ></section>
      <section
        style={{ display: winner === "" ? "none" : "flex" }}
        className={styles.winnerSection}
      >
        <p className={styles.winnerText}>Winner</p>
        <p className={styles.winnerPokemonText}>{winner}</p>
        <Button
          onClick={() => {
            setWinner("");
          }}
          className={styles.winnerButtonFinish}
        >
          Finish
        </Button>
      </section>
    </main>
  );
};

export default Fight;
