import React from "react";
import "./Carousel.css";
const Carousel = () => {
  const cItems = [
    {
      heading: "IPhone 15 Series",
      caption: "New IPhone is now on Pre-Order",
      id: "1",
      image:
        "https://firebasestorage.googleapis.com/v0/b/new-tech-ff9a5.appspot.com/o/NIBM-Final%2FPromo-Banners%2Fiphone-banner.jpg?alt=media&token=3db9566d-a37f-4b0e-af97-c19cacff4aeb",
    },
    {
      heading: "Samsung Galaxy S24 Series",
      caption: "New S24 is now on Pre-Order",
      id: "2",
      image:
        "https://firebasestorage.googleapis.com/v0/b/new-tech-ff9a5.appspot.com/o/NIBM-Final%2FPromo-Banners%2Fsamsung-banner.jpg?alt=media&token=74d35cc7-2cac-4058-97cc-0540debb4538",
    },
  ];
  return (
    <div
      id="carouselExampleAutoplaying"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{ height: window.screen.height / 2 }}
    >
      <div className="carousel-inner h">
        {cItems.map((v, k) => {
          return (
            <CarouselItem
              heading={v.heading}
              caption={v.caption}
              image={v.image}
              k={k}
              id={v.id}
              key={k}
            />
          );
        })}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

const CarouselItem = ({ heading, caption, image, k, id }) => {
  return (
    <div
      className={"h   carousel-item " + (k === 1 ? "active" : "")}
      data-bs-interval="7000"
    >
      <img
        src={image}
        alt="Carousel Item"
        className="w-100 h object-fit-cover"
      />
      <div className="carousel-caption text-white text-shadow">
        <h5>{heading}</h5>
        <p>{caption}</p>
        <a href={`/promo/${id}`} className="text-white">
          <i class="bi bi-box-arrow-up-right"></i> View More
        </a>
      </div>
    </div>
  );
};

export default Carousel;
