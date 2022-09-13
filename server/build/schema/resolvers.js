"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
exports.resolvers = {
    Query: {
        // CONTACT RESOLVERS
        contacts: () => {
            return; // mongo contact list
        },
        contact: (parent, args) => {
            const id = args.id;
            const contact = ''; // mongo find contact
            return contact;
        },
    },
    Mutation: {
        createContact: (parent, args) => {
            const contact = args.input;
            const lastId = ''; // last id logic
            contact.id = lastId + 1;
            // mongo add contact
            return contact;
        },
        updateContact: (parent, args) => {
            const { id, newUsername } = args.input;
            let updatedContact;
            // update contact in mongo
            return updatedContact;
        },
        deleteContact: (parent, args) => {
            const id = args.id;
            // mongo delete
            return null;
        },
    },
};
