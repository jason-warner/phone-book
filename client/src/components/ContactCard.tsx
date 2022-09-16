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
    Phone,
    BadgeRounded,
    DeleteForeverRounded
} from '@mui/icons-material'
import { useContactCtx } from './App';



export const ContactCard = (props: IContactCard) => {

    //// constants
    const { firstName, lastName, phoneNumber, id, Key } = props;
    const name = `${firstName} ${lastName}`;
    const buttonStyle = {
        borderRadius: '100%',
        color: '#DC3545'
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

    //// fn's
    const handleDelete = (id: IContactCard['id']) => {
        const newContactList = [...contactCtx.contactList];
        const targetIndex = newContactList.findIndex((x) => x?.id === id);
        newContactList.splice(targetIndex, 1);
        console.log('id!!!: ', id)
        return setContactCtx({
            contactList: newContactList,
            crudIds: { ...contactCtx.crudIds, deleteId: id },
            payload: { ...contactCtx.payload },
            triggerSubmit: false
        });
    }

    //// regional state
    const { contactCtx, setContactCtx } = useContactCtx();


    //// local state



    return (
        <Card key={Key} className='contactCard flex w-full my-1'>
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

                        <Button onClick={() => handleDelete(id)} sx={buttonStyle} className='rounded-full'>
                            <DeleteForeverRounded fontSize='large' className='h-full' />
                        </Button>

                    </CardContent>
                </ThemeProvider>
            </Box>
        </Card>
    )
}


export interface IContactCard {
    Key: string
    id?: string
    firstName: string
    lastName: string
    phoneNumber: string
}
