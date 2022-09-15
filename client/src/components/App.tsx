import React from 'react';
import logo from '../assets/logo.svg'
import '../styles/App.css';
import { ContactCard } from './ContactCard'
import { ContactForm } from './ContactForm';
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

  //// constants
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
  const initialContactFormCtx: IContactCtx = { ...initialContactCtx }


  //// fn's
  const contactFormReducer = (prevState: IContactCtx, newState: IContactCtx) => {
    return ({ ...prevState, ...newState })
  }
  const updateContactCtx = (field: "payload", value: IContactForm) => {
    const newContactCtx = { ...contactCtx };
    newContactCtx[field] = value;
    return setContactCtx(newContactCtx);
  }


  //// local state
  const [open, setOpen] = React.useState(false);
  const [contactCtx, setContactCtx] = React.useReducer(contactFormReducer, initialContactFormCtx);


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
                    onClick={() => setOpen(true)}
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

              {/* DB.map(() =>  */}
              <li className='flex flex-row'>
                <ContactCard Key={'temp-hard-coded-1'} firstName={'Jason'} lastName={'Warner'} phoneNumber={'(234) 874-3423'} />
              </li>
              <li className='flex flex-row'>
                <ContactCard Key={'temp-hard-coded-2'} firstName={'Jason'} lastName={'Warner'} phoneNumber={'(234) 874-3423'} />
              </li>
              <li className='flex flex-row'>
                <ContactCard Key={'temp-hard-coded-3'} firstName={'Jason'} lastName={'Warner'} phoneNumber={'(234) 874-3423'} />
              </li>
              {/* ) */}
            </ul>

          </main>
        </Container>
      </ContactFormContext.Provider>
    </div >
  );
}

const initialContactForm = {
  firstName: '',
  lastName: '',
  phoneNumber: ''
};
const initialContactCtx = {
  payload: initialContactForm
}
const ContactFormContext = React.createContext<{
  contactCtx: IContactCtx
  setContactCtx?: React.Dispatch<IContactCtx>
  updateContactCtx: (field: keyof typeof initialContactCtx, value: IContactForm) => void
}>({
  contactCtx: initialContactCtx,
  setContactCtx: () => undefined,
  updateContactCtx: () => undefined
});

export const useContactCtx = () => React.useContext<{
  contactCtx: any
  setContactCtx?: React.Dispatch<any>
  updateContactCtx: (field: keyof typeof initialContactCtx, value: IContactForm) => void
}>(ContactFormContext);

export default App;




interface IContactCtx {
  payload: IContactForm
}
interface IContactForm {
  phoneNumber: string
  firstName: string
  lastName: string
  id?: string
}
