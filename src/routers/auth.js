import express from 'express';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';

import { registerUserSchema, loginUserSchema, sendResetEmailSchema } from '../validation/auth.js';
import { registerUserController, loginUserController, logoutUserController, refreshUserSessionController, sendResetEmailController } from '../controllers/auth.js';

const router = Router();
const jsonParser = express.json();

router.post('/register', jsonParser, validateBody(registerUserSchema), ctrlWrapper(registerUserController));

router.post('/login', jsonParser, validateBody(loginUserSchema), ctrlWrapper(loginUserController));

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.post('/send-reset-email', jsonParser, validateBody(sendResetEmailSchema), ctrlWrapper(sendResetEmailController),
);

export default router;
