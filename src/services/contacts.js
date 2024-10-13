import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = () => {
  return ContactsCollection.find();
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
