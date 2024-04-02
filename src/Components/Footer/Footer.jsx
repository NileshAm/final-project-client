import { FaMobile } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { BsFillChatFill } from "react-icons/bs";
import {MdEmail} from "react-icons/md";
import './Footer.css'
import slogo from "./image/samsung.jpg";
import {Container ,Row , Col, Stack ,Image, Nav, NavLink} from 'react-bootstrap'


const Footer = () => {
  
  return (
    <footer> 
      <Container fluid>
      
      <Row className='bg-light logos'>
      <Col lg='3' md='3' className='my-2'>
        <img src={'https://1000logos.net/wp-content/uploads/2017/02/Apple-Logosu-500x281.png'} className='img-fluid ' alt='' />
      </Col>
      <Col lg='3' md='3' className='my-2'>
        <img src={'https://www.freepnglogos.com/uploads/xiaomi-png/xiaomi-logo-logos-marcas-8.png'} className='img-fluid ' alt='' />
      </Col>
      <Col lg='3' md='3' className='my-2'>
        <img src={'https://1000logos.net/wp-content/uploads/2021/05/Sony-logo.png'} className='img-fluid ' alt='' />
      </Col>
      <Col lg='3' md='3' className='my-2'>
        <img src={'https://www.freepnglogos.com/uploads/huawei-logo-png/huawei-icns-icon-download-15.png'} className='img-fluid ' alt='' />
      </Col>

      </Row>

        <Row className='bg-primary text-white p-4'>
          <Col className='mx-5'>
            <Stack>
              <Image
                  src={slogo}
                  alt='company-logo'
                  width={150}
                  height={150}  />
                  <h3>Contact Details</h3>
                  <p><MdEmail size="1em"/><strong> D-mobile@gmail.com</strong></p>
                  <p><FaMobile size="1em"/> <strong>Phone:</strong> 074-525-3322</p>
                  <p><FaLocationDot size="1em" color='white'/> <strong>Location:</strong> Kurunegala</p>
                  
            </Stack>
          </Col>
          <Col>
                <Nav className='flex-column fs-5'>
                  <h4>CUSTOMER CARE</h4>
                  <NavLink href='#' className='text-white'>My Account</NavLink>
                  <NavLink href='#' className='text-white'>Privacy Policy</NavLink>
                  <NavLink href='#' className='text-white'>Returns & Refunds</NavLink>
                  <NavLink href='#' className='text-white'>Terms & Conditions</NavLink>
                  <NavLink href='#' className='text-white'>Online Payments</NavLink>
                  <NavLink href='#' className='text-white'>Contact Us</NavLink>
                </Nav>
          </Col>
          <Col>
          <Nav className='flex-column fs-5'>
                  <h4>MOST VIEWED</h4>
                  <NavLink href='#' className='text-white'>Mobile Phones</NavLink>
                  <NavLink href='#' className='text-white'>Mobile Accessories</NavLink>
                  <NavLink href='#' className='text-white'>Laptops</NavLink>
                  <NavLink href='#' className='text-white'>Speakers</NavLink>
                  <NavLink href='#' className='text-white'>Smart Watches</NavLink>
                  <NavLink href='#' className='text-white'>Tablets</NavLink>
                </Nav>
          </Col>
        </Row>
        
      </Container>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright:
        <a className='text-reset fw-bold' href='D-Mobile'>
          D-Mobile
        </a>
      </div>
      
    </footer>
  );
};

export default Footer

{/* <div className="row">
        <div className="logos">
        <img className='col-md-3' src={slogo} width={100}/>
        <img className='col-md-3' src={slogo} width={100}/>
        <img className='col-md-3' src={slogo} width={100}/>
        <img className='col-md-3' src={slogo} width={100}/>
        </div> */}

      //   https://1000logos.net/wp-content/uploads/2017/02/Apple-Logosu-500x281.png
      // https://www.freepnglogos.com/uploads/xiaomi-png/xiaomi-logo-logos-marcas-8.png
      // https://www.freepnglogos.com/uploads/samsung-logo-transparent-background-8.png
      // https://www.freepnglogos.com/uploads/huawei-logo-png/huawei-icns-icon-download-15.png