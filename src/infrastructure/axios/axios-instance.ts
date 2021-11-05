import axios, { AxiosInstance } from "axios"
import configEnv from "./config-env"

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: configEnv.api_url,
})