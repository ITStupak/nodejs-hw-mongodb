import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import router from './routers/index.js'; // Імпортуємо роутер
import { env } from './utils/env.js';
import {errorHandler} from './middlewares/errorHandler.js';
import {notFoundHandler} from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = Number(env('PORT', '8080'));

export function setupServer() {

  const app = express();

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  app.use(cors());
  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(router); // Додаємо роутер до app як middleware

  // Middleware для обробких status 404
  app.use('*', notFoundHandler);

  // Middleware для обробких помилок
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
