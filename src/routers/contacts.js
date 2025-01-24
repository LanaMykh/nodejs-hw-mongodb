import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import * as contactsController from "../controllers/contacts.js";
import { validateBody } from "../utils/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import { addContactSchema, updateContactSchema } from "../validation/contacts.js";

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactsController.getContactsController));

contactsRouter.get('/:contactId', isValidId, ctrlWrapper(contactsController.getContactByIdController));

contactsRouter.post('/', validateBody(addContactSchema), ctrlWrapper(contactsController.addContactController));

contactsRouter.patch('/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(contactsController.patchContactController));

contactsRouter.delete('/:contactId', isValidId, ctrlWrapper(contactsController.deleteContactController));

export default contactsRouter;
