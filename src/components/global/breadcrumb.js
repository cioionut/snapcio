import { Container, Row, Breadcrumb } from 'react-bootstrap';


export default function MyBreadcrumb({ items }){
  const lastItemIdx = items.length - 1;
  const itemsJSX = items.map(({ itemHref, itemName }, index) => {
    return (index !== lastItemIdx)
    ? <Breadcrumb.Item key={index} href={ itemHref }>{ itemName }</Breadcrumb.Item>
    : <Breadcrumb.Item key={index} active>{itemName}</Breadcrumb.Item>
  });

  return (
    <Container fluid>
      <Row className='pt-2' style={{ backgroundColor: '#e3e3e3' }}>
        <Breadcrumb>
          { itemsJSX }
        </Breadcrumb>
      </Row>
    </Container>
  )
}
  