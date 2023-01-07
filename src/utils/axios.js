import axios from "axios";

// base url to make requests
const instance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export default instance;
