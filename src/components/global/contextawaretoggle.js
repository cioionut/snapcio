import { useContext } from 'react';
import { AccordionContext } from 'react-bootstrap';


import { MdExpandLess, MdExpandMore } from 'react-icons/md';


export default function ContextAwareToggle({ eventKey }) {
    const currentEventKey = useContext(AccordionContext);
    const isCurrentEventKey = currentEventKey === eventKey;
    return isCurrentEventKey ? <MdExpandLess size='1.5rem'/> : <MdExpandMore size='1.5rem'/>
  }
  