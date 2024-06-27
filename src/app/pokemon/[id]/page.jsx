"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Formik, Field, Form, ErrorMessage } from "formik";
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
} from "@mui/material";
import {
  updatePokemon,
  deletePokemon,
  readPokemonById,
} from "@/services/pokemon.services";
import { validations } from "@/app/newpokemon/validations";

const Pokemon = () => {
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("Unexpected error. Please try later");
  const [onePokemon, setOnePokemon] = useState({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleClose = () => {
    setIsToastVisible(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await readPokemonById(id);
      if (response.success) {
        console.log(response.response.response);
        setOnePokemon(response.response.response);
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

  const editPokemon = async (values) => {
    setIsLoading(true);
    setIsEditOpen(false);

    const keysFromValuesToSend = Object.keys(values).filter((valueToFormat) => {
      return values[valueToFormat] !== onePokemon[valueToFormat];
    });

    const valuesToSend = {};
    keysFromValuesToSend.forEach((valueToSend) => {
      valuesToSend[valueToSend] = values[valueToSend];
    });

    const response = await updatePokemon(valuesToSend, onePokemon._id);
    if (response.success) {
      const newOnePokemonObject = { ...onePokemon };
      keysFromValuesToSend.forEach((valueToSend) => {
        newOnePokemonObject[valueToSend] = values[valueToSend];
      });

      setOnePokemon(newOnePokemonObject);
      setIsError(false);
      setMessage("Pokemon saved successfuly");
      setIsToastVisible(true);
    } else {
      setMessage(response.error);
      setIsError(true);
      setIsToastVisible(true);
    }
    setIsLoading(false);
  };

  const deleteOnePokemon = async () => {
    setIsLoading(true);

    const response = await deletePokemon(onePokemon._id);
    if (response.success) {
      setIsError(false);
      setMessage("Pokemon deleted successfuly");
      setIsToastVisible(true);
      setIsDeleteOpen(false);
      setIsLoading(false);
      setInterval(() => {
        router.push("/");
      }, 2000);
    } else {
      setMessage(response.error);
      setIsError(true);
      setIsToastVisible(true);
      setIsLoading(false);
    }
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
              <Button
                onClick={() => {
                  setIsEditOpen(true);
                }}
                disabled={isEditOpen}
                className={styles.cardButtonEdit}
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  setIsDeleteOpen(true);
                }}
                disabled={isEditOpen}
                className={styles.cardButtonDelete}
              >
                Delete
              </Button>
            </div>
            <Button
              onClick={() => {
                router.push(`/fight/${onePokemon._id}`);
              }}
              disabled={isEditOpen}
              className={styles.cardButtonFight}
            >
              Fight
            </Button>
          </div>
        </CardContent>
      </Card>
      <section
        className={styles.formSection}
        style={{ display: isEditOpen ? "flex" : "none" }}
      >
        <Formik
          initialValues={{
            name: onePokemon.name,
            type: onePokemon.type,
            imageUrl: onePokemon.imageUrl,
            attack: onePokemon.attack,
            defense: onePokemon.defense,
            hp: onePokemon.hp,
            speed: onePokemon.speed,
          }}
          validationSchema={validations}
          onSubmit={editPokemon}
        >
          <Form className={styles.form}>
            <div className={styles.formBigDiv}>
              <fieldset>
                <div className={styles.inputContainer}>
                  <label htmlFor='name'>Name:</label>
                  <Field
                    className={styles.fieldInput}
                    placeholder='name'
                    name='name'
                    type='text'
                  />
                </div>
                <div className={styles.errorMessageContainer}>
                  <ErrorMessage name='name'>
                    {(msg) => <p className={styles.errorMessage}>{msg}</p>}
                  </ErrorMessage>
                </div>
              </fieldset>
              <fieldset>
                <div className={styles.inputContainer}>
                  <label htmlFor='type'>Type:</label>
                  <Field
                    className={styles.fieldInput}
                    placeholder='type'
                    name='type'
                    type='text'
                  />
                </div>
                <div className={styles.errorMessageContainer}>
                  <ErrorMessage name='type'>
                    {(msg) => <p className={styles.errorMessage}>{msg}</p>}
                  </ErrorMessage>
                </div>
              </fieldset>
              <fieldset>
                <div className={styles.inputContainer}>
                  <label htmlFor='imageUrl'>Image url:</label>
                  <Field
                    className={styles.fieldInput}
                    placeholder='imageUrl'
                    name='imageUrl'
                    type='text'
                  />
                </div>
                <div className={styles.errorMessageContainer}>
                  <ErrorMessage name='imageUrl'>
                    {(msg) => <p className={styles.errorMessage}>{msg}</p>}
                  </ErrorMessage>
                </div>
              </fieldset>
              <fieldset>
                <div className={styles.inputContainer}>
                  <label htmlFor='attack'>Attack:</label>
                  <Field
                    className={styles.fieldInput}
                    placeholder='attack'
                    name='attack'
                    type='number'
                  />
                </div>
                <div className={styles.errorMessageContainer}>
                  <ErrorMessage name='attack'>
                    {(msg) => <p className={styles.errorMessage}>{msg}</p>}
                  </ErrorMessage>
                </div>
              </fieldset>
              <fieldset>
                <div className={styles.inputContainer}>
                  <label htmlFor='defense'>Defense:</label>
                  <Field
                    className={styles.fieldInput}
                    placeholder='defense'
                    name='defense'
                    type='number'
                  />
                </div>
                <div className={styles.errorMessageContainer}>
                  <ErrorMessage name='defense'>
                    {(msg) => <p className={styles.errorMessage}>{msg}</p>}
                  </ErrorMessage>
                </div>
              </fieldset>
              <fieldset>
                <div className={styles.inputContainer}>
                  <label htmlFor='hp'>Hp:</label>
                  <Field
                    className={styles.fieldInput}
                    placeholder='hp'
                    name='hp'
                    type='number'
                  />
                </div>
                <div className={styles.errorMessageContainer}>
                  <ErrorMessage name='hp'>
                    {(msg) => <p className={styles.errorMessage}>{msg}</p>}
                  </ErrorMessage>
                </div>
              </fieldset>
              <fieldset>
                <div className={styles.inputContainer}>
                  <label htmlFor='speed'>Speed:</label>
                  <Field
                    className={styles.fieldInput}
                    placeholder='speed'
                    name='speed'
                    type='number'
                  />
                </div>
                <div className={styles.errorMessageContainer}>
                  <ErrorMessage name='speed'>
                    {(msg) => <p className={styles.errorMessage}>{msg}</p>}
                  </ErrorMessage>
                </div>
              </fieldset>
            </div>
            <div className={styles.formDivButtons}>
              <Button className={styles.formButtonSubmit} type={"submit"}>
                Submit
              </Button>
              <Button
                onClick={() => {
                  setIsEditOpen(false);
                }}
                className={styles.formButtonCancel}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Formik>
      </section>
      <section
        style={{ display: isDeleteOpen ? "flex" : "none" }}
        className={styles.deleteModalSection}
      >
        <p>¿Do you want to delete this pokemon?</p>
        <div className={styles.deleteModalDiv}>
          <Button
            onClick={deleteOnePokemon}
            className={styles.deleteModalButtonYes}
          >
            Yes. Delete!
          </Button>
          <Button
            onClick={() => {
              setIsDeleteOpen(false);
            }}
            className={styles.deleteModalButtonNo}
          >
            Cancel
          </Button>
        </div>
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

export default Pokemon;
