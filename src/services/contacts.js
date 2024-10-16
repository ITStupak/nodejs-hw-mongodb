import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();

  if (filter.name) {
    contactsQuery.where('name').equals(filter.name);
  }
  if (filter.phoneNumber) {
    contactsQuery.where('phoneNumber').lte(filter.phoneNumber);
  }
  if (filter.contactType) {
    contactsQuery.where('contactType').gte(filter.contactType);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  /* const contactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec(); */

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = (contactId) => {
  return ContactsCollection.findById(contactId);
};

export const createContact = (payload) => {
  return ContactsCollection.create(payload);
};

export const deleteContact = (contactId) => {
  return ContactsCollection.findOneAndDelete({ _id: contactId });
};

export const updateContact = (contactId, payload) => {
  return ContactsCollection.findOneAndUpdate({ _id: contactId }, payload, { new: true });
};
