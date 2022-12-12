import express, { Application, Router } from 'express';

import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import * as Sentry from '@sentry/node';
import connectDB from './config/db';

import config from 'config';

import Logger from 'utils/logger';
import { initializeStore } from 'utils/store';

import { notFoundError, genericErrorHandler } from 'middlewares/errorHandler';

const logger = new Logger('~/app');

class App {
  private app: Application;

  constructor(routes: Router) {
    connectDB();
    this.app = express();

    this.initializeUnhandelledErrorTracking();
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(compression());

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(initializeStore());

    this.initializeAPIRoutes(routes);
    this.initializeErrorHandlers();
  }

  initializeAPIRoutes(routes: Router) {
    const baseURL = config.app.baseURL;

    this.app.use(baseURL, routes);
  }

  initializeUnhandelledErrorTracking() {
    // Initialize Sentry
    // https://docs.sentry.io/platforms/node/express/
    Sentry.init({
      dsn: config.sentry.dsn,
      environment: config.sentry.environment
    });

    this.app.use(Sentry.Handlers.requestHandler());

    // Catch unhandled rejection
    process.on('unhandledRejection', (err) => {
      logger.error(`Unhandled rejection ${err}`);

      try {
        Sentry.captureException(err);
      } catch (sentryCaptureError) {
        logger.error('Raven error', sentryCaptureError);
      } finally {
        process.exit(1);
      }
    });

    // Catch uncaught exceptions
    process.on('uncaughtException', (err) => {
      logger.error('Unhandled exception', err);

      try {
        Sentry.captureException(err);
      } catch (sentryCaptureError) {
        logger.error('Raven error', sentryCaptureError);
      } finally {
        process.exit(1);
      }
    });
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
