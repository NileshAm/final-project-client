import React from 'react'
import {Container ,Row , Col,Button} from 'react-bootstrap';
import Ratio from 'react-bootstrap/Ratio';


function ProductView() {
  return (
    <>
      <Container className='mt-3 bg-light'>
        <Row className='' >
          <Col md={6}>
          <div style={{borderRadius: '10px',
           margin: 20}}
           className='phone'>
          <Ratio aspectRatio="1x1" >
            <img src={''} alt="" style={{ objectFit:'cover' }} />
          </Ratio>
          </div>

          </Col>

          <Col md={6} className='mt-2'>
          <h1>Product name</h1>
          <Row>
            <h5>Rating</h5>
            <Col>
            <div style={{backgroundColor: '#e6e1e3' }} >
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio asperiores harum amet pariatur aliquam architecto fugiat, dolorem aliquid vero sequi consequatur. Cum veritatis illum dolor aperiam repellendus asperiores, perferendis porro. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate velit veritatis est dolores mollitia saepe rem incidunt eos ipsa fugiat eaque quae expedita iste laboriosam accusantium, facilis magni animi perspiciatis.lo. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet doloribus omnis molestias, eos nesciunt eius rerum illum animi necessitatibus consequuntur sequi ut itaque nostrum recusandae harum laboriosam! Quo, optio tempora.</p>
            </div>
            </Col>
          </Row>
          
          <h3>Price</h3>
          <Row className='mt-3 d-grid gap-2 mx-auto mb-2'>
            <Button className='' variant="primary">Buy</Button>
            <Button className='' >Add to cart</Button>
          </Row>

          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ProductView