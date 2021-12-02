import { useCookies } from "react-cookie";
import { Button, Alert } from 'react-bootstrap';


export default function MyCookieConsent({ children, buttonText }) {

  const [cookies, setCookie] = useCookies(['cookieConsent']);  

  const acceptCookies = () => {
    setCookie('cookieConsent', true, { path: '/', maxAge: 7889231 });
  }

  return (
    !cookies.cookieConsent && 
      <Alert variant="primary" 
        style={{
          width: '100%',
          position: 'fixed',
          bottom: '0px',
          zIndex: '9999'
        }}>
        <p style={{fontSize: '0.8rem'}}>
          {children}
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={acceptCookies} variant="outline-dark" size="sm" style={{fontWeight: 600}}>
            {buttonText}
          </Button>
        </div>
      </Alert>
  );
}