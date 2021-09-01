import dynamic from 'next/dynamic'
import Link from 'next/link'
import Head from 'next/head'


import Layout from '../components/layout'

const NameInput = dynamic(
  () => import('../components/nameinput.js'),
  { ssr: false }
)


export default function Home() {
  
  return (
    <Layout>
      <Head>
        <title>Snapcio</title>
        <meta name="description" content="Chat free" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Welcome to <Link href="/">Snapcio</Link>
        </h1>

        <NameInput/>

      </main>
    </Layout>
  )
}
