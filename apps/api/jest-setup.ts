import Dotenv from 'dotenv';
Dotenv.config({ path: '.env.dev' });

process.on('unhandledRejection', (err) => {
  fail(err);
});
