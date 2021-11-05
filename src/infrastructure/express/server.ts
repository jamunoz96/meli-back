import express from 'express';
import { setupApp } from './setup/setup-app';
import { setupAsyncErrors } from './setup/setup-async-errors';
import { setupRoutes } from './setup/setup-routes';

export const app = express();

setupApp(app);
setupRoutes(app);
setupAsyncErrors(app);

const port = process.env.PORT || 4321;
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server listening -> http://127.0.0.1:${port}`);
  });
}
