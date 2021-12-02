import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';



const SearchCseModal = () => {

  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  return (
    <>

        <Button className="me-2" onClick={() => handleShow(true)}>
          Full screen
        </Button>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Modal body content
          {/* <div className="gcse-search"></div> */}
          <div className="gcse-searchresults-only"></div>
          

        </Modal.Body>
      </Modal>
    </>
  );
};

export default SearchCseModal;