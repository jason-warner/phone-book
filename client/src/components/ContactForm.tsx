import * as React from 'react';
import { useContactCtx } from './App'
import {
    FormControl,
    Box,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material'
import shortid from 'shortid'

export const ContactForm = (props: IContactForm) => {

    //// regional state
    const { updateContactCtx, contactCtx } = useContactCtx()


    //// constants
    const { shouldOpen, setShouldOpen } = props;



    //// fn's
    const updateForm = (field: keyof typeof formData, value: string) => {
        const newFormData = { ...formData };
        newFormData[field] = value;
        return setFormData(newFormData);
    }
    const updateContactList = () => {
        const key = shortid.generate();
        const newContact = { ...contactCtx.payload, Key: key };
        const newContactList = contactCtx.contactList;
        newContactList.push(newContact);
        return newContactList;
    }
    const handleSubmit = () => {
        setShouldOpen(false);
        updateContactCtx('contactList', updateContactList())
    }


    //// local state
    const [formData, setFormData] = React.useState({
        id: '',
        firstName: '',
        lastName: '',
        phoneNumber: ''
    });


    React.useEffect(() => updateContactCtx('payload', formData), [formData]);

    return (
        <div>
            <Dialog open={shouldOpen} onClose={() => setShouldOpen(false)}>
                <DialogTitle>Add Contact</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill out the form below, then click submit.
                    </DialogContentText>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        < Box className='flex flex-row'>
                            <TextField
                                onChange={({ currentTarget }: React.ChangeEvent<HTMLInputElement>) =>
                                    updateForm('firstName', currentTarget.value)}
                                className='w-1/2'
                                autoFocus
                                margin="dense"
                                id="name"
                                label="First Name"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                onChange={({ currentTarget }: React.ChangeEvent<HTMLInputElement>) =>
                                    updateForm('lastName', currentTarget.value)}
                                className='w-1/2'
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Last Name"
                                type="name"
                                fullWidth
                                variant="standard"
                            />
                        </Box>
                        <Box className='flex flex-row w-1/2'>
                            <TextField //
                                onChange={({ currentTarget }: React.ChangeEvent<HTMLInputElement>) =>
                                    updateForm('phoneNumber', currentTarget.value)}
                                className='w-1/2'
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Phone Number"
                                type="tel"
                                fullWidth
                                variant="standard"
                            />
                        </Box>
                    </FormControl>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShouldOpen(false)}>Cancel</Button>
                    <Button onClick={() => handleSubmit()}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export interface IContactForm {
    shouldOpen: boolean
    setShouldOpen: React.Dispatch<React.SetStateAction<boolean>>
}