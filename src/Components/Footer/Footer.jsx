import './Footer.css'
import slogo from "./image/samsung.jpg"


const Footer = () => {
  return (
    <div>
      <div className='footer'>

        <div className="logos">
        <img src={slogo} width={100}/>
        <img src={slogo} width={100}/>
        <img src={slogo} width={100}/>
        <img src={slogo} width={100}/>
        </div>

      <div className="foot-col-1">

        <div className="logo">

        </div> 
        <div className="contact-details">

        </div>

      </div>

    <div className="foot-col-2">

      <div className="customer-care">
        <ul>
          <li><a href="">My account</a></li>
          <li><a href="">My Account</a></li>
          <li><a href="">Privacy Policy</a></li>
          <li><a href="">Returns & Refunds</a></li>
          <li><a href="">Online Payments</a></li>
          <li><a href="">Contact Us</a></li>
        </ul>
      </div>

      <div className="most-viewd">
        <ul>
          <li><a href="">Mobile Phones</a></li>
          <li><a href="">Mobile Accessories</a></li>
          <li><a href="">Laptops</a></li>
          <li><a href="">Speakers</a></li>
          <li><a href="">Smart Watches</a></li>
          <li><a href="">Tablets</a></li>
        </ul>
      </div>

    </div>



      </div>

    </div>
  );
};

export default Footer