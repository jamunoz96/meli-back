import * as dotenv from "dotenv"

dotenv.config()

const configEnv = {
  port: process.env.PORT || 3000,
  api_url: process.env.API_URL || "https://api.mercadolibre.com",
}

export default configEnv
