import React, { useState } from 'react';
import { Form, FormControl, Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { VscSearch } from 'react-icons/vsc';
import styles from '../../styles/searchcse.module.css';


const SearchCse = () => {
  const { t, i18n } = useTranslation();

  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* <div className="gcse-search"></div> */}
      <span className={`mx-auto order-0 ps-5 ${styles.searchIcon}`}>
        <VscSearch className="mx-auto" size='1.35rem' onClick={handleShow} />
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{ t('searchTitle') }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="d-flex" action={`/search?q=${query}`}>
            <Form.Control
              name="cx"
              defaultValue="b2c0ee93f93f41e5f"
              hidden={true}
            />
            <Form.Control
              name="ie"
              defaultValue="UTF-8"
              hidden={true}
            />
            <FormControl
              value={query}
              onChange={e => setQuery(e.target.value)}
              size="sm"
              type="search"
              placeholder={ t('search') }
              name="q" id="q" autoComplete="true"
              className="me-2"
              aria-label="Search"
            />
            <Button type="submit" name="sa" variant="outline-success" size="sm">{ t('search') }</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            { t('close') }
          </Button>
        </Modal.Footer>
      </Modal>
   </>
  );
};

export default SearchCse;