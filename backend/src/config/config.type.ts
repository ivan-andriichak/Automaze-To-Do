export type Config = {
  app: AppConfig;
  postgres: PostgresConfig;
  sentry: SentryConfig;
};

export type AppConfig = {
  port: number;
  host: string;
  appUrl: string;
};

export type PostgresConfig = {
  port: number;
  host: string;
  user: string;
  password: string;
  dbName: string;
};

export type SentryConfig = {
  dsn: string;
  env: string;
  debug: boolean;
};
