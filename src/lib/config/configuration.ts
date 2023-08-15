export const configuration = () => {
  return {
    port: process.env.PORT,
    typeormConnection: process.env.TYPEORM_CONNECTION,
    typeormUsername: process.env.TYPEORM_USERNAME,
    typeormPassword: process.env.TYPEORM_PASSWORD,
    typeormDatabase: process.env.TYPEORM_DATABSE,
    typeormPort: process.env.TYPEORM_PORT,
  };
};
