
export const resolvers = {
  Query: {
    // CONTACT RESOLVERS
    contacts: () => {
      return; // mongo contact list
    },
    contact: (parent: any, args: any) => {
      const id = args.id;
      const contact = '' // mongo find contact
      return contact;
    },
  },

  Mutation: {
    createContact: (parent: any, args: any) => {
      const contact = args.input;
      const lastId = '' // last id logic
      contact.id = lastId + 1;
      // mongo add contact
      return contact;
    },

    updateContact: (parent: any, args: any) => {
      const { id, newUsername } = args.input;
      let updatedContact
      // update contact in mongo

      return updatedContact;
    },

    deleteContact: (parent: any, args: any) => {
      const id = args.id;
    // mongo delete
      return null;
    },
  },
};
