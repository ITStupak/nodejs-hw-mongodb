// Тут буде знаходитись логіка роботи вашого express-серверу.

// Створіть функцію setupServer, в якій буде створюватись express сервер.
// Ця функція має в себе включати:
// - Створення серверу за допомогою виклику express()
// - Налаштування cors та логгера pino.
// - Обробку неіснуючих роутів (повертає статус 404 і відповідне повідомлення)
/* {
  message: 'Not found',
} */
// - Запуск серверу на порті, вказаному через змінну оточення PORT або 3000, якщо такої змінної не зазначено
// - При вдалому запуску сервера виводити в консоль рядок “Server is running on port {PORT}”, де {PORT} - це номер вашого порту.
// Не забудьте вказати змінну оточення в файлі .env.example

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { env } from './utils/env.js';

// Читаємо змінну оточення PORT
const PORT = Number(env('PORT', '8080'));

export function setupServer() {

  const app = express();
  app.use(express.json()); // Вбудований у express middleware для обробки (парсингу) JSON-даних у запитах, наприклад, у запитах POST або PATCH
  app.use(cors());

  //Pino надає нам middleware і можливість додатково налаштовувати логгер через об’єкт властивостей.
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // Маршрут для обробки GET-запитів на '/'
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello, World!',
    });
  });

  app.get('/books', (req, res) => {
    res.send('Books');
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  // Middleware для обробких помилок (приймає 4 аргументи)
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
