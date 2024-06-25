"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@mui/material";
import Toast from "@/components/toast/Toast";

const Pokemon = () => {
  const params = useParams();
  const { id } = params;

  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleClick = () => () => {
    setIsToastVisible(true);
  };

  const handleClose = () => {
    setIsToastVisible(false);
  };

  return (
    <main>
      <p>Pokemon {id}</p>
      <Toast
        isToastVisible={isToastVisible}
        handleClose={handleClose}
        isErrorToast={true}
        message='test'
      />
      <Button onClick={handleClick()}>Top-Right</Button>
    </main>
  );
};

export default Pokemon;
