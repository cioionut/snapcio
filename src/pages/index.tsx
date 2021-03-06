// nextjs
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Head from 'next/head';

// react
import { useContext, useState, useEffect, useRef, useCallback } from 'react';

// meterial-ui
import { Box, Button, IconButton, ButtonGroup, Container, Grid, Fab, Paper, TextField } from '@mui/material';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CachedIcon from '@mui/icons-material/Cached';
import ReplayIcon from '@mui/icons-material/Replay';

import { green, yellow, red } from '@mui/material/colors';

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
          <StreamsContextProvider>
            <WebRTCContextProvider>
              <VChat/>
            </WebRTCContextProvider>
          </StreamsContextProvider>
      </Layout>
    </>
  )
}

const fabYellowStyle = {
  color: 'common.white',
  bgcolor: '#ed6c02',
  '&:hover': {
    bgcolor: yellow[900],
  },
};

const fabRedStyle = {
  color: 'common.white',
  bgcolor: red[500],
  '&:hover': {
    bgcolor: red[600],
  },
};

const fabGreenStyle = {
  color: 'common.white',
  bgcolor: green[500],
  '&:hover': {
    bgcolor: green[600],
  },
};


const VChat = () => {
  const {
    nextUser,
    availableUsers,
    myUsername,
    targetUsername
  } = useContext(WebRTCContext);

  const {
    localStream,
  } = useContext(StreamsContext);

  const isDevelopment = useRef(process.env.NEXT_PUBLIC_ENV !== 'production')

  return (
    <>
    {/* video chat */}
    <Container maxWidth={false} sx={{ 
      px: { xs: 0 },
    }}>
      {/* small screens */}
      <Container id='smallscreens' maxWidth={false} sx={{
        display: { xs: 'block', md: 'none'},
        px: { xs: 0 },
        // height: { xs: 300, md: 720 },
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
            <Box sx={{ 
              height: { xs: 300, md: 720 },
              width: '100%'
            }}>
              <OtherVideo/>
            </Box>
            <Box sx={{ 
              width: '100%'
            }}>
              <SelfVideo hFlip={true}/>
            </Box>
        </Box>
      </Container>

      {/* large screens */}
      <Container maxWidth='xl' sx={{
        display: { xs: 'none', md: 'block'},
        // width: '80%'
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          height: '100%'
        }}>
            <Box sx={{ 
              mt: 1,
              width: '100%'
            }}>
              <OtherVideo/>
            </Box>
            <Box sx={{ 
              mt: 1,
              width: '100%'
            }}>
              <SelfVideo hFlip={true}/>
            </Box>
        </Box>
      </Container>
    </Container>

    <Container id="chatbox" sx={{
      mt: 1,
      mb: { xs: 20 }
    }}>
      <Paper elevation={3}>
      </Paper>

    </Container>


    {/* conversation control action buttons */}
    <Container sx={{ 
        position: 'fixed',
        bottom: 0, 
        left: 0, 
        right: 0, 
        mb: 8,
        '& > :not(style)': { m: 1 },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* control buttons */}
      <Fab size='small' color="inherit" aria-label="replay" sx={{ ...fabYellowStyle }} disabled>
        <ReplayIcon />
      </Fab>
      <Fab aria-label="skipnext" sx={{ ...fabGreenStyle }} onClick={ nextUser } disabled={ !localStream }>
        <AutorenewIcon fontSize='large'/>
        {/* <CachedIcon sx={{ width: 35, height: 35}} /> */}
      </Fab>
      {/* <Fab size='small' aria-label="fav" >
        <FavoriteBorderIcon />
      </Fab> */}
      <IconButton aria-label="fav">
        <FavoriteBorderIcon />
      </IconButton>
      {/* </ButtonGroup> */}
    </Container>

    {/* other stats */}
    { isDevelopment.current && false &&
    <Container maxWidth="sm">
      <Box sx={{ my: 1 }}>
        Available Users: {availableUsers.length}
      </Box>
      <Box sx={{ my: 1 }}>
        MY Socket Id: {myUsername}
      </Box>
      <Box sx={{ mb: 10 }}>
        Peer Socket Id: {targetUsername}
      </Box>
    </Container>}
    </>
  )
}