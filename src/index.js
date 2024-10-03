// Імпортуйте і викличте у цьому файлі функцію setupServer

import { initMongoConnection } from "./db/initMongoConnection.js";
import { setupServer } from "./server.js";

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();
