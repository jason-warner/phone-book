import * as React from 'react';
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

export const ContactForm = (props: IContactForm) => {

    const { shouldOpen, setShouldOpen } = props;

    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        phoneNumber: ''
    });

    const updateForm = (field: keyof typeof formData, value: string) => {
        const newFormData = { ...formData };
        newFormData[field] = value;
        return setFormData(newFormData);
    }

    React.useEffect(() => console.info('form data: ', formData), [formData]);

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
                    <Button onClick={() => setShouldOpen(false)}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export interface IContactForm {
    shouldOpen: boolean
    setShouldOpen: React.Dispatch<React.SetStateAction<boolean>>
}