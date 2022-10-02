import axios from "axios";

export const request = axios.create({
  baseURL: "https://ecommerce-app21.herokuapp.com/",

  headers: {
    "x-auth-token":
      typeof window !== "undefined" &&
      (localStorage.getItem("token") as string),
    "Access-Control-Allow-Origin": "https://ecommerce-app21.herokuapp.com/payment",
  },
});
