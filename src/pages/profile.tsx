// nextjs
import Head from 'next/head';

// react
import { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useKeycloak } from '@react-keycloak/web';

// meterial-ui
import { Box, Button, Container} from '@mui/material';

// locals
import Layout from '../components/layout';


export default function Profile() {

  const { keycloak, initialized } = useKeycloak();

  // if (!initialized) {
  //   return <div>Loading...</div>
  // }

  if (initialized) {
    console.log(keycloak.tokenParsed);
  }

  return (
    <>

      <Layout>
          <Head>
            <title>Profile - Snapcio</title>
            <meta name="description" content="profile" />
          </Head>
          <Container maxWidth="md">
              <Box>
                Your Profile
              </Box>
              <Box>
                {
                  initialized &&
                  <div>
                    <div>{`User is ${
                      !keycloak.authenticated ? 'NOT ' : ''
                    }authenticated`}</div>

                    {!!keycloak.authenticated && (
                      <button type="button" onClick={() => keycloak.logout()}>
                        Logout
                      </button>
                    )}
                    {/* <div>
                      <p>{ keycloak.tokenParsed.given_name }</p>
                      <p>{ keycloak.tokenParsed.email }</p>
                    </div> */}
                  </div>
                }
              </Box>
          </Container>
        </Layout>


    </>
  )
}
