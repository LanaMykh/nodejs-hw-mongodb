import createHttpError from 'http-errors';
import * as contactServices from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { sortByList } from '../db/models/contacts.js';
import { saveFileToUploadsDir } from '../utils/saveFileToUploadsDir.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
  const filter = parseFilterParams(req.query);
  filter.userId = req.user._id;

  const contacts = await contactServices.getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId: _id } = req.params;
  const contact = await contactServices.getContactById({ _id, userId });

  if (!contact) {
    throw createHttpError(404, `Contact with id=${_id} not found`);
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${_id}!`,
    data: contact,
  });
};

export const addContactController = async (req, res) => {
  let photo;
  if (req.file) {
    photo = await saveFileToUploadsDir(req.file);
  }

  const { _id: userId } = req.user;
  const newContact = await contactServices.addContact({
    ...req.body,
    photo,
    userId,
  });

  res.json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId: _id } = req.params;
  const { _id: userId } = req.user;
  const result = await contactServices.updateContact({ _id, userId }, req.body);

  if (!result) {
    throw createHttpError(404, `Contact with id=${_id} not found`);
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};

export const deleteContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId: _id } = req.params;
  const contact = await contactServices.deleteContact({ _id, userId });

  if (!contact) {
    throw createHttpError(404, `Contact with id=${_id} not found`);
  }

  res.status(204).send();
};
