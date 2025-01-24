import ContactsCollection from "../db/models/contacts.js";
import { SORT_ORDER } from "../constans/contacts.js";
import { calcPaginationData } from "../utils/calcPaginationData.js";

export const getAllContacts = async ({
        page = 1,
        perPage = 10,
        sortBy = "_id",
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

  const totalItems = await ContactsCollection.find().merge(contactsQuery).countDocuments();
  const data = await contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder });

  const paginationData = calcPaginationData({ totalItems, page, perPage });

  return {
    data,
    ...paginationData,
  };
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const addContact = async (contactData) => {
  const newContact = await ContactsCollection.create(contactData);
  return newContact;
};

export const updateContact = async (contactId,updateContactData,options = {},) => {
  const result = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    updateContactData,
    { new: true,
      includeResultMetadata: true,
    },
  );

  if (!result || !result.value) return null;

  return {
    contact: result.value,
  };
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({ _id: contactId });
  return contact;
};
