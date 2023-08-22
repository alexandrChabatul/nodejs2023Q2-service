import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  TYPEORM_CONNECTION: Joi.string(),
  TYPEORM_USERNAME: Joi.string(),
  TYPEORM_PASSWORD: Joi.string(),
  TYPEORM_DATABASE: Joi.string(),
  TYPEORM_PORT: Joi.number(),
});
