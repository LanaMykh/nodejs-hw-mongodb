import ContactsCollection from '../db/models/contacts.js';
import { SORT_ORDER } from '../constants/contacts.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * limit;
  const contactsQuery = ContactsCollection.find();

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (filter.userId) {
    contactsQuery.where('userId').equals(filter.userId);
  }

  const totalItems = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();
  const data = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });

  const paginationData = calcPaginationData({ totalItems, page, perPage });

  return {
    data,
    ...paginationData,
  };
};

// export const getContactById = async (contactId) => {
//   const contact = await ContactsCollection.findById(contactId);
//   return contact;
// };
export const getContactById = async (filter) => {
  const contact = await ContactsCollection.findOne(filter);
  return contact;
};

export const addContact = async (contactData) => {
  const newContact = await ContactsCollection.create(contactData);
  return newContact;
};

export const updateContact = async (
  filter,
  updateContactData,
  options = {},
) => {
  const result = await ContactsCollection.findOneAndUpdate(
    filter,
    updateContactData,
    { new: true, includeResultMetadata: true },
  );

  if (!result || !result.value) return null;

  return {
    contact: result.value,
  };
};

export const deleteContact = async (filter) => {
  const contact = await ContactsCollection.findOneAndDelete(filter);
  return contact;
};
