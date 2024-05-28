import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';
//import cookieSession from 'cookie-session';

config();

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const COOKIE_KEY = process.env.COOKIE_KEY;
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: COOKIE_KEY,
      resave: false,
      saveUninitialized: false,
    }),
  );
  // app.use(
  //   cookieSession({
  //     keys: ['my-secret'],
  //     // resave: false,
  //     // saveUninitialized: false,
  //   }),
  // );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  (app as any).set('etag', false);
  app.use((req, res, next) => {
    res.removeHeader('x-powered-by');
    res.removeHeader('date');
    next();
  });
  await app.listen(PORT);
}
bootstrap();
