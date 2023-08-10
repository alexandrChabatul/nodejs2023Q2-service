import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
  type: configService.get<'postgres'>('TYPEORM_CONNECTION'),
  username: configService.get<string>('TYPEORM_USERNAME'),
  password: configService.get<string>('TYPEORM_PASSWORD'),
  database: configService.get<string>('TYPEORM_DATABASE'),
  port: configService.get<number>('TYPEORM_PORT'),
  entities: [`${__dirname}/../src/**/*.entity{.ts,.js}`],
  synchronize: configService.get('TYPEORM_SYNCHRONIZE') === 'true',
  logging: configService.get('TYPEORM_LOGGING') === 'true',
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  migrationsTableName: configService.get('TYPEORM_MIGRATIONS_TABLE_NAME'),
  migrationsRun: configService.get('TYPEORM_MIGRATIONS_RUN') == 'true',
});
