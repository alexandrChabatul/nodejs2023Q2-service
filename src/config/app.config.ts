import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  nodenv: process.env.NODE_ENV,
  logsLimit: process.env.LOGS_FILE_LIMIT || 10000,
  logsLevel: process.env.LOGS_LEVEL || 3,
  tokenSecret: process.env.JWT_SECRET_KEY,
  refreshTokenSecret: process.env.JWT_SECRET_REFRESH_KEY,
  tokenExpire: process.env.TOKEN_EXPIRE_TIME,
  refreshTokenExpire: process.env.TOKEN_REFRESH_EXPIRE_TIME,
}));
