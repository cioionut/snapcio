// nextjs
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Head from 'next/head';

// react
import { useContext, useState, useEffect, useRef, useCallback } from 'react';

// meterial-ui
import { Box, Button, Container} from '@mui/material';

// locals
import Layout from '../components/layout';
const SelfVideo = dynamic(
  () => import('../components/selfvideo'),
  { ssr: false }
);
import OtherVideo from '../components/othervideo';
import { WebRTCContext } from '../contexts/WebRTCContext';
const WebRTCContextProvider = dynamic(() =>
  import('../contexts/WebRTCContext').then((mod) => mod.WebRTCContextProvider)
);
import { StreamsContext, StreamsContextProvider } from '../contexts/StreamsContext';


export default function Chat() {
  return (
    <>
      <Layout>
          <Head>
            <title>Chat - Snapcio</title>
            <meta name="description" content="Chat free" />
          </Head>
          <Container maxWidth="sm">
            <StreamsContextProvider>
              <WebRTCContextProvider>
                <VChat/>
              </WebRTCContextProvider>
            </StreamsContextProvider>
          </Container>
        </Layout>
    </>
  )
}

const VChat = () => {
  const {
    nextUser,
    availableUsers
  } = useContext(WebRTCContext);

  return (
    <>
      <Box sx={{ my: 3 }}>
        <OtherVideo/>
      </Box>
      <Box sx={{ my: 3 }}>
        <SelfVideo/>
      </Box>
      <Box>
        <Button variant="contained" onClick={ nextUser }>Skip</Button>
      </Box>
      <Box>
        Available Users: {availableUsers.length}
      </Box>
    </>
  )
}