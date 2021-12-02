import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';

import SearchCse from './global/searchcse';
import Settings from './settings/settings';
import MyCookieConsent from './global/mycookieconsent';

// local styles
import styles from '../styles/layout.module.css';

export const siteName = 'Ionkom Chat';

export default function Layout ({ children }) {

  const router = useRouter();
  const { t, i18n } = useTranslation();
  const siteTitle = t('siteName');
  const locale = i18n.language;

  const cookiePolicyLink = locale === 'ro'
                            ? <Link href='/ro/politici/cookies'><a className='alert-link' target="_blank" rel="noopener">{ t('cookieconsent:cookiePolicy') }</a></Link>
                            : <Link href='https://www.ionkom.com/policies/cookies'><a className='alert-link' target="_blank" rel="noopener">{ t('cookieconsent:cookiePolicy') }</a></Link>

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:site_name" content={ siteName }/>
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={ locale } />
      </Head>

      <MyCookieConsent buttonText={ t('cookieconsent:confirm') }>
        { t('cookieconsent:consent') } { cookiePolicyLink }
      </MyCookieConsent>

      <Navbar collapseOnSelect fixed="top" bg="white" variant="light" expand="lg" className={`justify-content-center p-2 px-md-4 mb-1 ${styles.mainNavbar}`}>
        <Link href="/" passHref>
          <Navbar.Brand className={`me-auto ${styles.logoFont}`}>{siteTitle}</Navbar.Brand>
        </Link>
        {/* <SearchCse /> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto"  activeKey={router.asPath}>
            <Link href="/" passHref>
              <Nav.Link>{ t('home') }</Nav.Link>
            </Link>
            <Settings locale={locale} path={router.asPath}/>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <main>
        {children}
      </main>
      <footer className={styles.footer}>
        <Container fluid>
            <Row>
              <Col xs='auto'>
                <Link href="https://ionkom.com/about"><a className={styles.footerLink} target="_blank" rel="noopener">{ t('footer:aboutPageTitle') }</a></Link>
              </Col>
              <Col xs='auto'>
                <Link href='https://ionkom.com/policies/privacy'><a className={styles.footerLink} target="_blank" rel="noopener">{ t('footer:privacyPolicyPageTitle') }</a></Link>
              </Col>
              <Col xs='auto'>
                <Link href='https://ionkom.com/policies/terms'><a className={styles.footerLink} target="_blank" rel="noopener">{ t('footer:termsPageTitle') }</a></Link>
              </Col>
            </Row>
        </Container>
      </footer>
    </>
  )
}