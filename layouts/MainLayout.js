import Head from 'next/head';
import { Container } from '@material-ui/core';
import PrimaryAppBar from '../components/PrimaryAppBar';
import Box from '@material-ui/core/Box';

export default function MainLayout(props){
    return (
        <>
        <Head><title>{props.pageTitle}</title></Head>

        <PrimaryAppBar />

        <Container>
            <Box m={5}>
                <main>{props.children}</main>
            </Box>
        </Container>
        </>
    );
}