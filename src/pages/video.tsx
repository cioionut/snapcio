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
import { StreamsContext, StreamsContextProvider } from '../contexts/StreamsContext';


export default function Chat() {
  return (
    <>
      <Layout>
          <Head>
            <title>Chat - Snapcio</title>
            <meta name="description" content="Chat free" />
          </Head>
          <Container maxWidth="md">
            <StreamsContextProvider>
              <SelfVideo defaultMute={false} faceDetect={true} stats={true} />
            </StreamsContextProvider>
          </Container>
        </Layout>
    </>
  )
}
