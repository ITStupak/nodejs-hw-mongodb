import express from 'express';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';

import { registerUserSchema } from '../validation/auth.js';
import { registerUserController } from '../controllers/auth.js';

import { loginUserSchema} from '../validation/auth.js';
import { loginUserController } from '../controllers/auth.js';

const router = Router();
const jsonParser = express.json();

router.post('/register', jsonParser, validateBody(registerUserSchema), ctrlWrapper(registerUserController));

router.post('/login', jsonParser, validateBody(loginUserSchema), ctrlWrapper(loginUserController));

export default router;