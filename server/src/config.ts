import { config } from 'dotenv';

const pathToEnv = __dirname + '/../.env';

config({ path: pathToEnv });

const serverConfig = {
  env: process.env.NODE_ENV,
  app: {
    name: process.env.APP_NAME,
    port: +process.env.PORT || +process.env.APP_PORT || 3000,
    version: process.env.APP_VERSION,
    baseURL: process.env.APP_BASE_URL
  },
  database: {
    client: process.env.DB_CLIENT,
    port: +process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: 'utf8',
    timezone: 'UTC'
  },
  auth: {
    clientId: process.env.AUTH_CLIENT_ID,
    authURL: process.env.AUTH_URL
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
    environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV
  }
};

export default serverConfig;
