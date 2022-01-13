// nextjs
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Head from 'next/head';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

// locals
import Layout from '../components/layout';
const Video = dynamic(
  () => import('../components/video'),
  { ssr: false }
);


export default function Chat() {
  return (
    <>
      <Layout>
          <Head>
            <title>Chat - Snapcio</title>
            <meta name="description" content="Chat free" />
          </Head>

          <Container maxWidth="sm">
            <Box sx={{ my: 3 }}>
              <Video/>
            </Box>
          </Container>
        </Layout>
        
    </>
    
  )
}
