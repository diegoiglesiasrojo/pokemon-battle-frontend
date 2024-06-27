import * as Yup from "yup";

export const validations = Yup.object({
  name: Yup.string()
    .min(2, "Name requires a minimum of 2 characters")
    .max(40, "Name requires a maximum of 40 characters")
    .required("Name is required"),
  type: Yup.string()
    .min(2, "Type requires a minimum of 2 characters")
    .max(40, "Type requires a maximum of 40 characters")
    .required("Type is required"),
  imageUrl: Yup.string()
    .min(2, "Url image requires a minimum of 2 characters")
    .max(1000, "Url image requires a maximum of 1000 characters")
    .required("Url image is required"),
  attack: Yup.number()
    .min(0, "Minimum value must be 0")
    .max(255, "Maximum value must be 255")
    .required("Number is required"),
  defense: Yup.number()
    .min(0, "Minimum value must be 0")
    .max(255, "Maximum value must be 255")
    .required("Number is required"),
  hp: Yup.number()
    .min(0, "Minimum value must be 0")
    .max(255, "Maximum value must be 255")
    .required("Number is required"),
  speed: Yup.number()
    .min(0, "Minimum value must be 0")
    .max(255, "Maximum value must be 255")
    .required("Number is required"),
});
