import { readContacts } from '../utils/readContacts.js';

export const countContacts = async () => {
    try {
        const data = await readContacts();
        return `There are ${data.length} contacts in your database📲`;
    } catch (error) {
        console.error(error);
    }
};

console.log(await countContacts());
