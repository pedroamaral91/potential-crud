const BASE_DIR = process.env.NODE_ENV === 'production' ? 'dist' : 'src';

const HOST =
  process.env.NODE_ENV === 'development'
    ? 'localhost'
    : process.env.NODE_ENV === 'test'
    ? 'localhost'
    : process.env.DB_HOST;

const config = {
  type: process.env.DB_DIALECT,
  host: HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database:
    process.env.NODE_ENV === 'test' ? 'gazin_test' : process.env.DB_DATABASE,
  autoLoadEntities: true,
};

module.exports = {
  ...config,
  synchronize: false,
  migrationsRun: false,
  dropSchema: false,
  logging: true,
  entities: [`${BASE_DIR}/**/*.entity.{ts,js}`],
  migrations: [`${BASE_DIR}/shared/db/typeorm/migrations/**/*.{ts,js}`],
  subscribers: [`${BASE_DIR}/shared/db/typeorm/subscribers/*.{ts,js}`],
  cli: {
    migrationsDir: `${BASE_DIR}/shared/db/typeorm/migrations`,
  },
};
