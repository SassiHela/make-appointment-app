import React from "react";
import { Carousel, Image } from "react-bootstrap";

const CarouselSite = () => {
  return (
    <Carousel pause="hover" className="bg-black ">
      <Carousel.Item>
        <Image
          src="/assets/recycling_container.jpg"
          alt="recycling container"
          fluid
        />
        <Carousel.Caption className="carousel-caption">
          <h2>Ensemble réduisons nos déchets</h2>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselSite;
