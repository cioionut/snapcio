// nextjs
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Head from 'next/head';

import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';

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

          <Container fluid>
            <Row>
              <Col xs={6}>
                <Video/>
              </Col>
            </Row>
          </Container>
        </Layout>
        
    </>
    
  )
}
