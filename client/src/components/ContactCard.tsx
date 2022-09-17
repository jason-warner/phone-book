import {
    createTheme,
    ThemeProvider,
    Card,
    Box,
    CardContent,
    Button,
} from '@mui/material';
import '../styles/ContactCard.css';
import {
    Edit,
    Phone,
    BadgeRounded,
    DeleteForeverRounded
} from '@mui/icons-material'
import { useContactCtx } from './App';



export const ContactCard = (props: IContactCard) => {

    //// constants
    const { firstName, lastName, phoneNumber, id } = props;
    const name = `${firstName} ${lastName}`;


    //// fn's
    const handleDelete = (id: IContactCard['id']) => {
        const newContactList = [...contactCtx.contactList];
        const targetIndex = newContactList.findIndex((x) => x?.id === id);
        newContactList.splice(targetIndex, 1);
        return setContactCtx({
            contactList: newContactList,
            crudIds: { ...contactCtx.crudIds, deleteId: id },
            payload: { ...contactCtx.payload },
            triggerSubmit: false,
            isEdit: false
        });
    }
    const handleEdit = (id: IContactCard['id']) => {
        setContactCtx({
            payload: contactCtx.payload,
            contactList: contactCtx.contactList,
            crudIds: { ...contactCtx.crudIds, updateId: id },
            triggerSubmit: contactCtx.triggerSubmit,
            isEdit: true
        })
    }

    //// regional state
    const { contactCtx, setContactCtx } = useContactCtx();

    return (
        <Card key={id} className='contactCard flex w-full my-1'>
            <Box className='flex flex-col w-full'>
                <ThemeProvider theme={theme}>
                    <CardContent sx={{ padding: '1rem' }} className='flex flex-row w-full'>

                        <div className='flex flex-col h-full w-full justify-between'>
                            <h5 className='contactCard flex flex-row font-medium pb-2'>
                                <BadgeRounded className='mr-4 h-full self-center' />
                                {name}
                            </h5>
                            <h6 className='phoneNumber flex flex-row pt-2 text-gray-500'>
                                <Phone className='mr-4 h-full self-center' />
                                {phoneNumber}
                            </h6>
                        </div>

                        {Boolean(!!id && id?.length > 9) &&
                            <>
                                <Button onClick={() => handleDelete(id)} sx={deleteButtonStyle} className='rounded-full'>
                                    <DeleteForeverRounded fontSize='large' className='h-full' />
                                </Button>
                                <Button onClick={() => handleEdit(id)} sx={editButtonStyle} className='rounded-full'>
                                    <Edit fontSize='large' className='h-full' />
                                </Button>
                            </>
                        }
                    </CardContent>
                </ThemeProvider>
            </Box>
        </Card>
    )
}

const deleteButtonStyle = {
    borderRadius: '100%',
    color: '#DC3545'
};
const editButtonStyle = {
    borderRadius: '100%',
    color: '#282c34'
};
const theme = createTheme({
    components: {
        MuiCardContent: {
            styleOverrides: {
                root: {
                    "&:last-child": {
                        paddingBottom: '1rem',
                    }
                }
            }
        }
    }
});


export interface IContactCard {
    id?: string
    firstName: string
    lastName: string
    phoneNumber: string
}
