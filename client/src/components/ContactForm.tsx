import * as React from 'react';
import { IPayload, useContactCtx } from './App'
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
    const { updateContactCtx, contactCtx, setContactCtx } = useContactCtx()


    //// constants
    const { shouldOpen, setShouldOpen } = props;
    const initialFormData = {
        id: '',
        firstName: '',
        lastName: '',
        phoneNumber: ''
    }


    //// fn's
    const updateForm = (field: keyof typeof formData, value: string) => {
        const newFormData = { ...formData };
        newFormData[field] = value;
        return setFormData(newFormData);
    }
    const addToContactList = () => {
        const key = shortid.generate();
        const newContact = { ...contactCtx.payload, Key: key, id: key };
        const newContactList = contactCtx.contactList;
        newContactList.push(newContact);
        return newContactList;
    }
    const updateContactList = () => {
        const newContactList = [...contactCtx.contactList];
        const targetIndex = newContactList.findIndex((x) => x.id === formData.id);
        if (targetIndex >= 0) {
            newContactList[targetIndex] = formData;
        }
        return newContactList;
    }
    const handleSubmit = () => {
        setShouldOpen(false);
        const isEdit = contactCtx.isEdit;
        const { firstName, lastName, phoneNumber } = formData;

        if (!isEdit) {
            const newFormData = {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber
            }
            return setContactCtx({
                contactList: addToContactList(),
                payload: newFormData,
                crudIds: contactCtx.crudIds,
                triggerSubmit: true,
                isEdit: false
            });
        } else if (!!isEdit) {
            const newFormData = {
                newFirstName: firstName,
                newLastName: lastName,
                newPhoneNumber: phoneNumber
            }
            return setContactCtx({
                contactList: updateContactList(), // @ts-ignore
                payload: newFormData,
                crudIds: contactCtx.crudIds,
                triggerSubmit: true,
                isEdit: true
            });
        }
    }
    const isValid = (data: typeof formData) => Boolean(
        !!(data.firstName?.length > 0)
        && !!(data.lastName?.length > 0)
        && !!(data.phoneNumber?.length > 0)
    );
    const handleUpdateContact = () => {
        const updateId = contactCtx.crudIds.updateId;
        if (!(!!updateId)) return
        else if (!!(updateId?.length < 1)) return;
        else if (updateId?.length > 0) {
            const updateContact = contactCtx.contactList.find((x) => x.id === updateId);
            if (!!updateContact) return setFormData(updateContact);
        }
    }
    const handleOnClose = (shouldOpen: boolean) => {
        if (!shouldOpen) return (
            updateContactCtx('isEdit', false),
            setFormData(initialFormData)
        )
    }


    //// local state
    const [formData, setFormData] = React.useState(initialFormData as IPayload);
    React.useEffect(() => updateContactCtx('payload', formData), [formData]);
    React.useEffect(() => handleUpdateContact(), [contactCtx.crudIds.updateId]);
    React.useEffect(() => handleOnClose(shouldOpen), [shouldOpen]);

    return (
        <div>
            <Dialog open={shouldOpen} onClose={() => setShouldOpen(false)}>
                <DialogTitle>{!!contactCtx.isEdit ? 'Edit' : 'Add'} Contact</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please {!!contactCtx.isEdit ? 'update' : 'fill out'} the form below, then click submit.
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
                                label={!!contactCtx.isEdit ? "" : "First Name"}
                                type="text"
                                fullWidth
                                variant="standard"
                                value={formData.firstName}
                            />
                            <TextField
                                onChange={({ currentTarget }: React.ChangeEvent<HTMLInputElement>) =>
                                    updateForm('lastName', currentTarget.value)}
                                className='w-1/2'
                                autoFocus
                                margin="dense"
                                id="name"
                                label={!!contactCtx.isEdit ? "" : "Last Name"}
                                type="name"
                                fullWidth
                                variant="standard"
                                value={formData.lastName}
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
                                label={!!contactCtx.isEdit ? "" : "Phone Number"}
                                type="tel"
                                fullWidth
                                variant="standard"
                                value={formData.phoneNumber}
                            />
                        </Box>
                    </FormControl>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShouldOpen(false)}>Cancel</Button>
                    <Button onClick={() => isValid(formData) && handleSubmit()}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export interface IContactForm {
    shouldOpen: boolean
    setShouldOpen: React.Dispatch<React.SetStateAction<boolean>>
}
