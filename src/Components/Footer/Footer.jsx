import "./Footer.css";
import slogo from "../../logo.svg";
import {
  Container,
  Row,
  Col,
  Stack,
  Image,
  Nav,
  NavLink,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const Footer = () => {
  return (
    <footer>
      <Container fluid className="p-0">
        <Row className="bg-light logos">
          <Col lg="3" md="3" className="my-2">
            <img
              src={
                "https://1000logos.net/wp-content/uploads/2017/02/Apple-Logosu-500x281.png"
              }
              className="img-fluid "
              alt=""
            />
          </Col>
          <Col lg="3" md="3" className="my-2">
            <img
              src={
                "https://www.freepnglogos.com/uploads/xiaomi-png/xiaomi-logo-logos-marcas-8.png"
              }
              className="img-fluid "
              alt=""
            />
          </Col>
          <Col lg="3" md="3" className="my-2">
            <img
              src={
                "https://1000logos.net/wp-content/uploads/2021/05/Sony-logo.png"
              }
              className="img-fluid "
              alt=""
            />
          </Col>
          <Col lg="3" md="3" className="my-2">
            <img
              src={
                "https://www.freepnglogos.com/uploads/huawei-logo-png/huawei-icns-icon-download-15.png"
              }
              className="img-fluid "
              alt=""
            />
          </Col>
        </Row>

        <Row className="bg-secondary text-white p-3 pb-0">
          <Col className="mx-5">
            <Stack>
              <Image src={slogo} alt="company-logo" width={200} />
              <h3>Contact Details</h3>
              <p>
                <a
                  className="bi bi-envelope-at-fill text-white"
                  href="mailto: name@email.com"
                >
                  {" "}
                  jmdase@gmail.com
                </a>
              </p>
              <p>
                <i className="bi bi-telephone-fill"></i> 074-525-3322
              </p>
              <p>
                {/* eslint-disable-next-line */}
                <a
                  href="https://www.google.com/maps/place/Katugastota+-+Kurunegala+-+Puttalam+Hwy,+Kurunegala/@7.4877034,80.3640931,48m/data=!3m1!1e3!4m6!3m5!1s0x3ae33a1e41f6505b:0x178cfd3ffe329ccf!8m2!3d7.4876812!4d80.3641685!16s%2Fg%2F11b8v6ztwd?entry=ttu"
                  target="_blank"
                  className="text-white bi bi-geo-alt"
                >
                  No.69, First Floor, Bus Stand Complex, Kurunegala, Sri Lanka
                </a>
              </p>
            </Stack>
          </Col>
          <Col>
            <Nav className="flex-column fs-6">
              <h4>CUSTOMER CARE</h4>
              <NavLink href={'/info'} className="text-white p-1 ps-4">
                Privacy Policy
              </NavLink>
              <NavLink href={'/info'} className="text-white p-1 ps-4">
                Returns & Refunds
              </NavLink>
              <NavLink href={'/info'} className="text-white p-1 ps-4">
                Terms & Conditions
              </NavLink>
              <NavLink href={'/info'} className="text-white p-1 ps-4">
                Online Payments
              </NavLink>
            </Nav>
          </Col>
          <Col>
            <Nav className="flex-column fs-6">
              <h4>MOST VIEWED</h4>
              <NavLink href={'/search?term=&brands=&categories=1&rating=0&price=500000'} className="text-white  p-1 ps-4">
                Mobile Phones
              </NavLink>
              <NavLink href={'/search?term=&brands=&categories=3&rating=0&price=500000'} className="text-white  p-1 ps-4">
                Mobile Accessories
              </NavLink>
              <NavLink href={'http://localhost:3000/search?term=&brands=&categories=2&rating=0&price=500000'} className="text-white  p-1 ps-4">
                Tablets
              </NavLink>
            </Nav>
          </Col>
        </Row>
      </Container>
      <div className="bg-secondary text-center pb-3">
        © 2024 Copyright:
        <a className="text-reset fw-bold" href={'/info'}>
          D-Mobile
        </a>
      </div>
    </footer>
  );
};

export default Footer;
