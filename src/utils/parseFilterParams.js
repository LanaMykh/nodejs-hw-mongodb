import { CONTACT_TYPE } from '../constans/contacts.js';

const parseContactType = (string) => {
  if (typeof string !== 'string') return;

  if (CONTACT_TYPE.includes(string)) {
    return string;
  }

  return;
};

const parseIsFavourite = (value) => {
  if (typeof value !== 'string') return;

  if (value.toLowerCase() === 'true') return true;

  if (value.toLowerCase() === 'false') return false;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedType = parseContactType(contactType);
  const parsedFavour = parseIsFavourite(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedFavour,
  };
};
