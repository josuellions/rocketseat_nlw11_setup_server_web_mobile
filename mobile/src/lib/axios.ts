import axios from "axios";

export const api = axios.create({
  baseURL: 'http://21.21.21.11:3333'
})