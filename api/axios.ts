import {default as AXIOS} from "axios";

export const axios = AXIOS.create({});

export const axiosPrivate = AXIOS.create({
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 5000,
  timeoutErrorMessage: "Nie udało się połączyć z serwerem"
});
