"use client";

import styles from "./battleList.module.css";
import { useState, useEffect } from "react";
import { Button, Box, CircularProgress } from "@mui/material";
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

  console.log(listOfBattles);
  return (
    <main className={styles.main}>
      <h1>Battle List</h1>
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
