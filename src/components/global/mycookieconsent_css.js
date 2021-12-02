import { useState } from "react";
import { useCookies } from "react-cookie";


export default function MyCookieConsent({ children, buttonText }) {

  const [cookies, setCookie] = useCookies(['cookieConsent']);
  const [show, setShow] = useState(!cookies.cookieConsent);
  const acceptCookies = () => {
    setShow(false);
    setCookie('cookieConsent', true, { path: '/', maxAge: 7889231 });
  }

  return (
    <>
      {
        show &&
        <div 
          style={{
            width: '100%',
            position: 'fixed',
            bottom: '0px',
            zIndex: '9999',

            // .alert-primary
            color: '#084298',
            backgroundColor: '#cfe2ff',
            borderColor: '#b6d4fe',

            //.alert
            padding: '1rem',
            marginBottom: '1rem',
            border: '1px solid transparent',
            borderRadius: '.25rem',

          }}>
          <p style={{fontSize: '0.8rem'}}>
            {children}
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <button onClick={acceptCookies}
            style={{
              fontWeight: 600,

              // .btn-group-sm>.btn, .btn-sm
              padding: '.25rem .5rem',
              fontSize: '.875rem',
              borderRadius: '.2rem',

              // .btn-outline-dark
              color: '#212529',
              // borderColor: '#212529',

              // .btn
              display: 'inline-block',
              lineHeight: 1.5,
              textAlign: 'center',
              textDecoration: 'none',
              verticalAlign: 'middle',
              userSelect: 'none',
              backgroundColor: 'transparent',
              // border: '1px solid transparent',
            
            }}>
              {buttonText}
            </button>
          </div>
        </div>
      }
    </>
  );
}