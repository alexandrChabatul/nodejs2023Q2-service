import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { join } from 'path';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await app.get(ConfigService);
  const port = config.get<number>('PORT') || 3000;
  const apiSpecPath = join(__dirname, '../../doc/api.yaml');
  const apiSpec = yaml.load(readFileSync(apiSpecPath, 'utf8'));
  SwaggerModule.setup('api', app, apiSpec);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, () => {
    console.log(`Server was started on ${port}`);
  });
}
bootstrap();
