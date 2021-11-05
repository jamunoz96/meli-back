import { Application, json } from 'express';
import helmet from 'helmet';
import cors from "cors";

export const setupApp = (app: Application): void => {
  app.set('trust proxy', 1);
  app.use(cors())
  app.use(helmet());
  app.use(json());
};
