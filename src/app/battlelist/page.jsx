"use client";

import * as React from "react";
import styles from "./battleList.module.css";
import { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
} from "@mui/material";
import { readBattleList } from "@/services/battleList.services";
import Toast from "@/components/toast/Toast";

const BattleList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("Unexpected error. Please try later");
  const [listOfBattles, setListOfBattles] = useState([]);

  const handleClose = () => {
    setIsToastVisible(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await readBattleList();
      if (response.success) {
        setListOfBattles(response.response.response);
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

  if (listOfBattles.length === 0) {
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
      <h1>Battle List</h1>
      <section className={styles.section}>
        {listOfBattles.map((battle) => {
          const battleDate = new Date(battle.createdAt);
          const battleDateFormated = battleDate.toLocaleString();
          return (
            <Card
              key={battle._id}
              sx={{ maxWidth: 290 }}
              className={styles.card}
            >
              <CardHeader
                className={styles.cardHeader}
                title={battleDateFormated}
              />
              <div className={styles.cardDiv}>
                <CardContent
                  className={styles.firstCardContent}
                  sx={{
                    borderColor:
                      battle.winner === battle.firstPokemon.name
                        ? "green"
                        : "red",
                  }}
                >
                  <CardMedia
                    component='img'
                    alt='pokemon'
                    height='120'
                    image={battle.firstPokemon.imageUrl}
                  />
                  <p>{battle.firstPokemon.name}</p>
                  <p
                    style={{
                      color:
                        battle.winner === battle.firstPokemon.name
                          ? "green"
                          : "red",
                    }}
                  >
                    {battle.winner === battle.firstPokemon.name
                      ? "Winner"
                      : "Loser"}
                  </p>
                </CardContent>
                <CardContent
                  className={styles.secondCardContent}
                  sx={{
                    borderColor:
                      battle.winner === battle.secondPokemon.name
                        ? "green"
                        : "red",
                  }}
                >
                  <CardMedia
                    component='img'
                    alt='pokemon'
                    height='120'
                    image={battle.secondPokemon.imageUrl}
                  />
                  <p>{battle.secondPokemon.name}</p>
                  <p
                    style={{
                      color:
                        battle.winner === battle.secondPokemon.name
                          ? "green"
                          : "red",
                    }}
                  >
                    {battle.winner === battle.secondPokemon.name
                      ? "Winner"
                      : "Loser"}
                  </p>
                </CardContent>
              </div>
            </Card>
          );
        })}
      </section>
      <Toast
        isToastVisible={isToastVisible}
        handleClose={handleClose}
        isErrorToast={isError}
        message={message}
      />
    </main>
  );
};

export default BattleList;
