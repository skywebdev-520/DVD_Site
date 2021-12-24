/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Data from "../Data.js";
import OwlCarousel from "react-owl-carousel";
import { NavLink } from "react-router-dom";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const options = {
  loop: true,
  margin: 10,
  items: 3,
  autoplay: true,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
      nav: true,
    },
    600: {
      items: 3,
      nav: false,
    },
    1000: {
      items: 5,
      nav: true,
      loop: false,
    },
  },
};

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const result = Data.items.filter((product) => product.featured);
    setData(result);
  }, []);
  return (
    <div className="featured-items">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-heading">
              <div className="line-dec"></div>
              <h1>Featured Items</h1>
            </div>
          </div>
          <div className="col-md-12">
            {data.length > 0 ? (
              <OwlCarousel className="owl-theme owl-refresh" {...options}>
                {data.map((item) => (
                  <div className="item">
                    <NavLink to={"/product/" + item.id}>
                      <div className="featured-item">
                        <img
                          src={item.image}
                          className="img-responsive"
                          alt="Item"
                        />
                        <h4>{item.name}</h4>
                      </div>
                    </NavLink>
                  </div>
                ))}
              </OwlCarousel>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
