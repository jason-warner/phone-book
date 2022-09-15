
import {
    Card,
    Box,
    CardContent,
    Typography,
} from '@mui/material';
import '../styles/ContactCard.css';

export const ContactCard = (props: IProps) => {

    const { } = props;


    return (
        <Card className='contactCard flex w-full'>
            <Box className='flex flex-col'>
                <CardContent className='flex flex-row justify-start'>
                    <h5 className='contactCard'>
                        Jason Warner (test)
                    </h5>
                </CardContent>
            </Box>
        </Card>
    )
}


export interface IProps {

}