import React from "react";
import OwlCarousel from "react-owl-carousel";
import { NavLink } from "react-router-dom";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const options = {
  loop: true,
  margin: 10,
  items: 3,
  autoplay: true,
};
class MyOwlCarousel extends React.Component {
  state = {
    data: [],
  };
  componentDidMount() {
    this.setState({ data: this.props.data });
  }
  render() {
    return (
      <div>
        {this.props.data.length > 0 ? (
          <OwlCarousel className="owl-theme owl-refresh" {...options}>
            {this.props.data.map((item, index) => (
              <div
                className="item"
                style={{ width: "80%", marginLeft: "10%", height: "500px" }}
              >
                <NavLink to={"/product/" + item.id}>
                  <div
                    className="featured-item"
                    style={{ width: "100%", height: "500px" }}
                  >
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
    );
  }
}
export default MyOwlCarousel;
