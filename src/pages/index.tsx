// nextjs
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Head from 'next/head';

// react
import { useContext, useState, useEffect, useRef, useCallback } from 'react';

// meterial-ui
import { Box, Button, IconButton, ButtonGroup, Container, Grid, Fab} from '@mui/material';
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

  return (
    <>
    <Container maxWidth="xl">
      {/* small screens */}
      <Box sx={{ display: { md: 'none' } }}>
        <Box sx={{ mt: 1 }}>
          <OtherVideo/>
        </Box>
        <Box sx={{ mb: 1 }}>
          <SelfVideo hFlip={true}/>
        </Box>
      </Box>

      {/* large screens */}
      <Box sx={{ display: { xs: 'none', md: 'block'} }}>
        <Grid sx={{ my: 1}} container spacing={2}>
          <Grid item xs={6}>
            <OtherVideo/>
          </Grid>
          <Grid item xs={6}>
            <SelfVideo hFlip={true}/>
          </Grid>          
        </Grid>
      </Box>
    </Container>

    <Container maxWidth="sm">
      {/* control buttons */}

      <Box sx={{ 
        '& > :not(style)': { m: 1 },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {/* <ButtonGroup aria-label="button group" > */}
            {/* <Button 
              color="success"
              size='large' variant="contained" 
              startIcon={<AutorenewIcon />} 
              onClick={ nextUser }
            >
                Skip
            </Button> */}
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
      </Box>

      <Box sx={{ my: 1 }}>
        Available Users: {availableUsers.length}
      </Box>
      <Box sx={{ mb: 10 }}>
        MY Socket Id: {myUsername}
      </Box>
      <Box sx={{ mb: 10 }}>
        Peer Socket Id: {targetUsername}
      </Box>
    </Container>
      
    </>
  )
}