import React from 'react';
import logo from '../assets/logo.svg'
import '../styles/App.css';
import { ContactCard, IContactCard } from './ContactCard'
import { ContactForm } from './ContactForm';
import { useMutation, useQuery } from '@tanstack/react-query'
import request from 'graphql-request'
import {
  addContactMutation,
  editContactMutation,
  deleteContactMutation,
  getAllContactsMutation,
} from '../gql'
import {
  ThemeProvider,
  createTheme,
  Container,
  Box,
  Button
} from '@mui/material'
import {
  RecentActorsRounded,
  AddRounded
} from '@mui/icons-material'

function App() {

  //// fn's
  const getContacts = () => request(`http://localhost:4000/graphql`, getAllContactsMutation);
  const deleteContactMutationFn = async () => request(`http://localhost:4000/graphql`, deleteContactMutation, {
    deleteContactId: contactCtx.crudIds.deleteId
  })
  const contactFormReducer = (prevState: IContactCtx, newState: IContactCtx) => {
    return ({ ...prevState, ...newState })
  }
  const updateContactCtx = (field: keyof typeof initialContactCtx, value: (IPayload | IContactList | ICrudIds)) => {
    const newContactCtx = { ...contactCtx }; //@ts-ignore
    newContactCtx[field] = value;
    return setContactCtx(newContactCtx);
  }
  const handleContactsData = (contacts: IContactCard[]) => {
    if (!!contacts) {
      if (contactCtx.contactList?.length > 0) {
        const existingContacts = [...contactCtx.contactList];
        const newContacts = existingContacts.filter((existingContact) => !contacts.find((newContact) => existingContact?.id === newContact.id));
        const updatedContacts = [...existingContacts, ...newContacts]
        return updateContactCtx('contactList', updatedContacts);
      } else {
        const existingContacts = [...contactCtx.contactList, ...contacts];
        return updateContactCtx('contactList', existingContacts);
      }
    }
  }
  const handleDeleteMutation = (id: string | undefined) => {
    if (!!id?.length) {
      return deleteContact.mutate({ deleteContactId: `${id}` });
    }
  }


  //// queries / mutations
  const {
    isLoading: loadingContacts,
    error: loadContactsErr,
    data: contactsData
  } = useQuery(["getAllContacts"], getContacts);
  const deleteMutationOptions = {
    onError: (err: Error) => console.error('delete contact error: ', err),
    onSuccess: () => updateContactCtx('crudIds', { ...contactCtx.crudIds, deleteId: '' })
  }
  const deleteContact = useMutation<IPayload, Error, IDeleteContact>(['deleteContact'], deleteContactMutationFn, deleteMutationOptions);


  //// constants
  const initialContactFormCtx: IContactCtx = { ...initialContactCtx, ...contactsData?.contacts };


  //// local state
  const [open, setOpen] = React.useState(false);
  const [contactCtx, setContactCtx] = React.useReducer(contactFormReducer, initialContactFormCtx);

  React.useEffect(() => handleContactsData(contactsData?.contacts), [contactsData?.contacts]);
  React.useEffect(() => handleDeleteMutation(contactCtx.crudIds.deleteId), [contactCtx.crudIds.deleteId]);

  React.useEffect(() => console.log('context: ', contactCtx), [contactCtx]);

  return (
    <div className="App">
      <ContactFormContext.Provider value={{ contactCtx, setContactCtx, updateContactCtx }}>
        <Container>
          <header className="App-header flex flex-row items-center justify-center">
            <img src={logo} className="App-logo flex flex-col self-center" alt="logo" />
            <h1 className='flex flex-col'>
              Phone Book App
            </h1>
          </header>
          <main className='addContactTitle flex flex-col'>
            <ul className='flex flex-col w-full lg:w-8/12 self-center'>
              <Box className='flex flex-row justify-between py-5'>
                <h3 className='contactTitle text-white font-medium tracking-wide h-full self-center'>
                  Contacts
                  <RecentActorsRounded sx={{ color: '#61dafb', fontSize: 'inherit' }} className='ml-4' />
                </h3>

                <ThemeProvider theme={buttonTheme}>
                  <Button
                    onClick={() => (setOpen(true))}
                    sx={addContactButtonStyle}
                    className='self-center'>
                    <AddRounded sx={{ color: '#282c34' }} className='mr-2' />
                    <h4 className='addContact text-md  lg:text-lg font-bold'>
                      Add Contact
                    </h4>
                  </Button>
                </ThemeProvider>
              </Box>

              <ContactForm shouldOpen={open} setShouldOpen={setOpen} />

              {contactCtx.contactList.map((contact: IContactCard, index: number) => {
                const { Key, id, firstName, lastName, phoneNumber } = contact;

                const chooseKey = () => {
                  if (id !== undefined) return id;
                  else if (Key !== undefined) return Key;
                  else return `contact-${index}`;
                }
                const key = chooseKey();
                return (
                  <li key={`contact-card-${key}`} className='flex flex-row'>
                    <ContactCard id={key} Key={key} firstName={firstName} lastName={lastName} phoneNumber={phoneNumber} />
                  </li>
                )
              })}
            </ul>

          </main>
        </Container>
      </ContactFormContext.Provider>
    </div >
  );
}
const addContactButtonStyle = {
  background: '#61dafb',
  height: 'fit-content',
  textTransform: 'unset',
  "&:hover": {
    background: "white"
  }
}
const buttonTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            color: "white"
          }
        }
      }
    }
  }
});



const initialContactForm = {
  firstName: '',
  lastName: '',
  phoneNumber: ''
};
const initialContactCtx = {
  payload: initialContactForm,
  contactList: [],
  crudIds: {
    deleteId: '',
    updateId: '',
    readId: ''
  }
}
const ContactFormContext = React.createContext<{
  contactCtx: IContactCtx
  setContactCtx: React.Dispatch<IContactCtx>
  updateContactCtx: (field: keyof typeof initialContactCtx, value: IPayload | IContactList | ICrudIds) => void
}>({
  contactCtx: initialContactCtx,
  setContactCtx: () => undefined,
  updateContactCtx: () => undefined
});

export const useContactCtx = () => React.useContext<{
  contactCtx: IContactCtx
  setContactCtx: React.Dispatch<IContactCtx>
  updateContactCtx: (field: keyof typeof initialContactCtx, value: IPayload | IContactList | ICrudIds) => void
}>(ContactFormContext);

export default App;


export type IContactList = IContactCard[];

export interface IContactCtx {
  payload: IPayload
  contactList: IContactList
  crudIds: ICrudIds
}
export interface IPayload {
  phoneNumber: string
  firstName: string
  lastName: string
  id?: string
}

export interface ICrudIds {
  deleteId?: string,
  updateId?: string,
  readId?: string,
}

export interface IDeleteContact {
  deleteContactId: string
}
