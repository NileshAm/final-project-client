import React from "react";
import { Container } from "react-bootstrap";

function About() {
  return (
    <Container>
      <h1 className="mt-2">About Us</h1>
      <p
        style={{
          fontSize: "18px",
          fontFamily: "Arial, Helvetica, sans-serif",
          lineHeight: "25px",
          marginBottom: "3vh",
        }}
      >
        D-mobile is your trusted destination for all your mobile phone needs. We
        are committed to providing our customers with the latest and most
        innovative mobile devices, accessories, and services. With a focus on
        quality, reliability, and customer satisfaction, we strive to exceed
        expectations and deliver exceptional value to our customers.
        <br />
        <br />
        At D-mobile, we believe in building lasting relationships with our
        customers by offering personalized service, expert advice, and reliable
        support. Our team of knowledgeable professionals is dedicated to helping
        you find the perfect mobile solution to meet your needs, whether you're
        looking for the latest smartphone, a stylish case, or reliable repair
        services.
        <br />
        <br />
        As a locally owned and operated business, we take pride in serving our
        community and contributing to its growth and success. We are committed
        to operating with integrity, honesty, and transparency in all aspects of
        our business. Our goal is to be the preferred choice for mobile phones
        and accessories, providing our customers with the best products, prices,
        and service in the industry.
        <br />
        <br />
        <span className="fw-bold">
          Thank you for choosing D-mobile. We look forward to serving you and
          exceeding your expectations.
        </span>
      </p>
    </Container>
  );
}

export default About;
