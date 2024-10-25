import express from 'express';
import { Router } from "express";

import {
    getContactsController,
    getContactByIdController,
    createContactController,
    deleteContactController,
    patchContactController,
  } from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';


const router = Router();
const jsonParser = express.json();

router.use(authenticate);

router.get('/', checkRoles(ROLES.TEACHER), ctrlWrapper(getContactsController));
router.get('/:contactId', isValidId, checkRoles(ROLES.TEACHER, ROLES.ADMIN), ctrlWrapper(getContactByIdController));
router.post('/', jsonParser, validateBody(createContactSchema), checkRoles(ROLES.TEACHER), ctrlWrapper(createContactController));
router.delete('/:contactId', isValidId, checkRoles(ROLES.TEACHER), ctrlWrapper(deleteContactController));
router.patch('/:contactId', jsonParser, isValidId, checkRoles(ROLES.TEACHER, ROLES.ADMIN), validateBody(updateContactSchema), ctrlWrapper(patchContactController));

export default router;
