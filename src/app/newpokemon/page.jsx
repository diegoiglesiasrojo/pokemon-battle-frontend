"use client";

import styles from "./newPokemon.module.css";
import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button, Box, CircularProgress } from "@mui/material";
import { validations } from "./validations";
import { createNewPokemon } from "@/services/pokemon.services";
import Toast from "@/components/toast/Toast";

const NewPokemon = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("Unexpected error. Please try later");

  const handleClose = () => {
    setIsToastVisible(false);
  };

  const createPokemon = async (values) => {
    setIsLoading(true);
    const response = await createNewPokemon(values);
    if (response.success) {
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

  if (isLoading) {
    return (
      <main className={styles.main}>
        <Box sx={{ display: "flex" }}>
          <CircularProgress color='success' />
        </Box>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <h1>Create new Pokemon</h1>
      <Formik
        initialValues={{
          name: "",
          type: "",
          imageUrl: "",
          attack: 0,
          defense: 0,
          hp: 0,
          speed: 0,
        }}
        validationSchema={validations}
        onSubmit={createPokemon}
      >
        <Form className={styles.form}>
          <div className={styles.bigDiv}>
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
          <Button className={styles.buttonSubmit} type={"submit"}>
            Submit
          </Button>
        </Form>
      </Formik>
      <Toast
        isToastVisible={isToastVisible}
        handleClose={handleClose}
        isErrorToast={isError}
        message={message}
      />
    </main>
  );
};

export default NewPokemon;
