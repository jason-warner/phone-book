"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const contact_1 = require("../mongodb/contact");
exports.resolvers = {
    Query: {
        contact: async (_, args) => {
            const { id } = args;
            const contact = await contact_1.Contact.findById(id);
            return contact;
        },
        contacts: async () => {
            return contact_1.Contact.find({});
        },
    },
    Mutation: {
        createContact: async (_, args) => {
            const { firstName, lastName, phoneNumber } = args.input;
            const contacts = new contact_1.Contact({
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber
            });
            await contacts.save();
            return contacts;
        },
        updateContact: async (_, args) => {
            const { id } = args;
            const { newFirstName, newLastName, newPhoneNumber } = args.input;
            const newContact = await contact_1.Contact.findByIdAndUpdate(id, {
                firstName: newFirstName,
                lastName: newLastName,
                phoneNumber: newPhoneNumber
            });
            return newContact;
        },
        deleteContact: async (_, args) => {
            const { id } = args;
            const contact = await contact_1.Contact.findByIdAndDelete(id);
            return contact;
        },
    },
};
