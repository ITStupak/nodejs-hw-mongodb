
const parseName = (name) => {
    const isString = typeof name === 'string';
    if (!isString) return;

    const parsedName = parseInt(name);
    if (Number.isNaN(parsedName)) {
        return;
    }

    return parsedName;
};

const parsePhoneNumber = (phoneNumber) => {
    const isString = typeof phoneNumber === 'string';
    if (!isString) return;

    const parsedPhoneNumber = parseInt(phoneNumber);
    if (Number.isNaN(parsedPhoneNumber)) {
        return;
    }

    return parsedPhoneNumber;
};

const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const isContactType = (contactType) => ['work', 'home', 'personal'].includes(contactType);

  if (isContactType(contactType)) return contactType;
};

export const parseFilterParams = (query) => {
  const { name, contactType, phoneNumber } = query;

  const parsedName = parseName(name);
  const parsedPhoneNumber = parsePhoneNumber(phoneNumber);
  const parsedContactType = parseContactType(contactType);

  return {
      name: parsedName,
      phoneNumber: parsedPhoneNumber,
      contactType: parsedContactType,
  };
};
