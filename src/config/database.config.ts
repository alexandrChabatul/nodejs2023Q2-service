import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.TYPEORM_CONNECTION as 'postgres',
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: Number(process.env.TYPEORM_PORT),
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  logging: process.env.TYPEORM_LOGGING === 'true',
  migrations: [`${__dirname}/../../db/migrations/*{.ts,.js}`],
  migrationsTableName: process.env.TYPEORM_MIGRATIONS_TABLE_NAME,
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN == 'true',
}));
