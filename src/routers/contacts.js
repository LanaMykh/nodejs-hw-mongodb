import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import * as contactsController from "../controllers/contacts.js";

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactsController.getContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(contactsController.getContactByIdController));

contactsRouter.post('/', ctrlWrapper(contactsController.addContactController));

contactsRouter.patch('/:contactId', ctrlWrapper(contactsController.patchContactController));

contactsRouter.delete('/:contactId', ctrlWrapper(contactsController.deleteContactController));

export default contactsRouter;
