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
} from '@mui/material' //@ts-ignoree

export const ContactForm = (props: IContactForm) => {

    const { shouldOpen, setShouldOpen } = props;

    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        phoneNumber: ''
    });

    const updateForm = (field: keyof typeof formData, value: string) => {
        let newFormData = { ...formData };
        newFormData[field] = value;
        console.log(field, value, newFormData);
        return setFormData(newFormData);
    }

    React.useEffect(() => console.log('form data: ', formData), [formData]);

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
                                onChange={(props: any) => updateForm('firstName', props.value)}
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
                                onChange={(props: any) => updateForm('lastName', props.value)}
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
                            <TextField
                                onChange={(props: any) => updateForm('phoneNumber', props.value)}
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