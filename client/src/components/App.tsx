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


  const [open, setOpen] = React.useState(false);



  return (
    <div className="App">
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
    </div>
  );
}

export default App;
