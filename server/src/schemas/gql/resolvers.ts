import { Contact } from "../mongodb/contact";

export const resolvers = {
  Query: {
    contact: async (_: any, args: any) => {
      const { id } = args;
      const contact = await Contact.findById(id);
      return contact;
    },
    contacts: async () => {
      return Contact.find({});
    },
  },

  Mutation: {
    createContact: async (_: any, args: any) => {
      const { firstName, lastName, phoneNumber } = args.input;
      const contacts = new Contact({
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber
      });
      await contacts.save();
      return contacts;
    },

    updateContact: async (_: any, args: any) => {
      const { id } = args;
      const { newFirstName, newLastName, newPhoneNumber } = args.input
      const newContact = await Contact.findByIdAndUpdate(id, {
        firstName: newFirstName,
        lastName: newLastName,
        phoneNumber: newPhoneNumber
      })
      return newContact;
    },

    deleteContact: async (_: any, args: any) => {
      const { id } = args;
      const contact = await Contact.findByIdAndDelete(id);
      return contact;
    },
  },
};