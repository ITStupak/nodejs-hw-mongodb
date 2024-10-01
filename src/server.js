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

export function setupServer() {

  const app = express();
  const PORT = 3000;

  // Middleware для логування часу запиту
  app.use((req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });

  // Вбудований у express middleware для обробки (парсингу) JSON-даних у запитах
  // наприклад, у запитах POST або PATCH
  app.use(express.json());

  // Маршрут для обробки GET-запитів на '/'
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello, World!',
    });
  });

  // Middleware для обробких помилок (приймає 4 аргументи)
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
