import React from 'react';
import logo from '../assets/logo.svg'
import '../styles/App.css';
import { ContactCard } from './ContactCard'
import {
  Container,
  Box,
  Button
} from '@mui/material'

function App() {
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
              <h3 className='contactCard text-white font-medium tracking-wide'>Contacts</h3>
              <Button sx={{
                background: '#61dafb'
              }}>
                <span className='addContact font-bold'>
                  Add Contact
                </span>
              </Button>
            </Box>
            {/* DB.map(() =>  */}
            <li className='flex flex-row'>
              <ContactCard />
            </li>
            {/* ) */}
          </ul>

        </main>
      </Container>
    </div>
  );
}

export default App;
