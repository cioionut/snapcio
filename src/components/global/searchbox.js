import { useRouter } from 'next/router';
import { Form, FormControl, Button } from 'react-bootstrap';


const SearchBox = ({ currentCity, href }) => {

  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <>
      <Form className="d-flex">
        <FormControl
          onClick={handleClick}
          value={currentCity}
          size="sm"
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
      </Form>
   </>
  );
};

export default SearchBox;