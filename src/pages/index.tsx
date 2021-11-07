// nextjs
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Head from 'next/head';

// locals
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

          <h1>Snapcio - Ionkom Select</h1>

          <ChatMain/>

        </Layout>
    </>
    
  )
}
