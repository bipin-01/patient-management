import express, { Application, Router } from 'express';

import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import * as Sentry from '@sentry/node';
import connectDB from './config/db';

import config from 'config';

import Logger from 'utils/logger';


import { notFoundError, genericErrorHandler } from 'middlewares/errorHandler';

const logger = new Logger('~/app');

class App {
  private app: Application;

  constructor(routes: Router) {
    connectDB();
    this.app = express();

    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(compression());

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));


    this.initializeAPIRoutes(routes);
    this.initializeErrorHandlers();
  }

  initializeAPIRoutes(routes: Router) {
    const baseURL = config.app.baseURL;

    this.app.use(baseURL, routes);
  }

  public listen(port: number) {
    this.app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  }

  private initializeErrorHandlers() {
    this.app.use(genericErrorHandler);
    this.app.use(notFoundError);
  }
}

export default App;
