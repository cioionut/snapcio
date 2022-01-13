// nextjs
import dynamic from 'next/dynamic';
// import Link from 'next/link';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';

// locals
import Link from '../components/global/Link';
import Layout from '../components/layout';

const ChatMain = dynamic(
  () => import('../components/chatx'),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <Layout>
          <Head>
            <title>Snapcio</title>
            <meta name="description" content="Chat free" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Container maxWidth="sm">
            <Box sx={{ my: 1 }}>
              <ChatMain/>
            </Box>
          </Container>
        </Layout>
    </>
    
  )
}
