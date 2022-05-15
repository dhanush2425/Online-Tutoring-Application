import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Containers/Style.css";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

class KalisuCarousel extends Component {
  render() {
    return (
      <div className="container">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-img-dimension"
              src={process.env.PUBLIC_URL + "/images/carousel_img1.png"}
              alt="First slide"
            />
            <Carousel.Caption>
              <h1>Welcome to Kalisu!</h1>
              <p></p>
              <p>
                <Link to={'/Signup'} className="btn btn-primary">Signup?</Link>
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-img-dimension"
              src={process.env.PUBLIC_URL + "/images/carousel_img2.jpg"}
              alt="Second slide"
            />

            <Carousel.Caption className="text-end">
              <h1>Explore!</h1>
              <p>
                <a className="btn btn-lg btn-primary" href="#">
                  Browse gallery
                </a>
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-img-dimension"
              src={process.env.PUBLIC_URL + "/images/carousel_img3.jpg"}
              alt="Third slide"
            />

            <Carousel.Caption className="text-start">
              <h1>Our tutors!</h1>
              <p>
                <a className="btn btn-lg btn-primary" href="#">
                  Learn more
                </a>
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default KalisuCarousel;
