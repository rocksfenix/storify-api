export const enviroments = {
  dev: '.env',
  stag: '.stag.env',
  production: '.prod.env',
};

export const envFilePath = enviroments[process.env.NODE_ENV] || enviroments.dev;
