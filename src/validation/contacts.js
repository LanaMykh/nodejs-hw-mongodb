import Joi from 'joi';
import { CONTACT_TYPE } from '../constans/contacts.js';

export const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().min(3).max(20).allow(null),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid(...CONTACT_TYPE)
    .min(3)
    .max(20)
    .default('personal')
    .required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().email().min(3).max(20).allow(null),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid(...CONTACT_TYPE)
    .min(3)
    .max(20)
    .default('personal'),
});
