import React from "react";
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useCookies } from "react-cookie";

import { RiSettings5Fill } from 'react-icons/ri';

import { languages } from '../../i18n/config';

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
// eslint-disable-next-line react/display-name
const CustomToggle = React.forwardRef(({ locale, units, children, onClick }, ref) => (
  <span
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{ cursor: 'pointer'}}
  >
    <RiSettings5Fill size='1.2rem' /> <span className="align-middle">{locale.toUpperCase()}</span>
  </span>
));

const Settings = ({ locale, path }) => {

  const supportedLangs = languages;
  const { t, i18n } = useTranslation();
  const changeLangDispStr = 'Change Language';
  const [cookies, setCookie] = useCookies(['units']);
  let units = cookies.units;
  if (!units) {
    setCookie('units', 'metric', { path: '/', maxAge: 7889231 });
    units = 'metric';
  }

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  }

  const langOptions = supportedLangs.map((lang, index) => 
    <Dropdown.Item key={index} eventKey={index} active={locale === lang} onClick={() => changeLanguage(lang)}>
      { lang.toUpperCase() }
    </Dropdown.Item>
  )

  return (
    <Dropdown navbar={true} className="nav-link"  align='end'>
      <Dropdown.Toggle as={ CustomToggle } id="togleid" locale={locale} units={units}/>
      
      <Dropdown.Menu className="super-colors">
        <Dropdown.Header>
          { changeLangDispStr }
        </Dropdown.Header>
        { langOptions }
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Settings;