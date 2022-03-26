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


export default function Login() {

  // const location = useLocation<{ [key: string]: unknown }>()
  // const currentLocationState = location.state || {
  //   from: { pathname: '/home' },
  // }

  // const { keycloak } = useKeycloak()

  // const login = useCallback(() => {
  //   keycloak?.login()
  // }, [keycloak])

  // if (keycloak?.authenticated)
  //   return <Redirect to={currentLocationState?.from as string} />
  const login = () => {};

  return (
    <>
      <Layout>
          <Head>
            <title>Profile - Snapcio</title>
            <meta name="description" content="profile" />
          </Head>
          <Container maxWidth="md">
            <div>
              <Button type="button" onClick={login}>
                Login
              </Button>
            </div>
          </Container>
        </Layout>
    </>
  )
}
