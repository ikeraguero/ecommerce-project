import * as yup from "yup";

export const validationSchemaShipping = yup.object().shape({
  address: yup.string().required("Address is required"),
  postalCode: yup
    .string()
    .matches(/^\d+$/, "Postal code must be a string of numbers")
    .max(7, "Postal code cannot exceed 7 characters")
    .required("Postal code is required"),
  city: yup.string().trim().required("City is required"),
  state: yup.string(),
});

export const validationSchemaPayment = yup.object().shape({
  paymentMethod: yup.string().required("Payment method is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  cardCvc: yup
    .string()
    .matches(/^\d{3,4}$/, "CVC must be a 3 or 4-digit number")
    .required("CVC is required"),
  cardNumber: yup
    .string()
    .test(
      "card-number-format",
      "Card number must be 16 digits",
      (value) => value && value.replace(/\s/g, "").length === 16
    )
    .required("Card number is required"),
  cardExpiration: yup
    .string()
    .matches(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Expiration date must be in MM/YY format"
    )
    .required("Card expiration date is required"),
  cardholderName: yup.string().trim().required("Cardholder name is required"),
});