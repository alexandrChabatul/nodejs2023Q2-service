import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  nodenv: process.env.NODE_ENV,
  logsLimit: process.env.LOGS_FILE_LIMIT || 10000,
  logsLevel: process.env.LOGS_LEVEL || 3,
}));
