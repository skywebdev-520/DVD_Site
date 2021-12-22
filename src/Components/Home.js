import React from "react";
import { NavLink } from "react-router-dom";
import Data from "../Data.js";

class Home extends React.Component {
  state = {
    data: [],
  };
  componentDidMount() {
    const result = Data.items.filter((product) => product.featured);
    this.setState({ data: result });
  }

  render() {
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

            {this.state.data.map((item, index) => (
              <div className="col-md-3">
                <NavLink to={"/product/" + item.id}>
                  <div className="featured-item">
                    <img src={item.image} alt="Item" />
                    <h4>{item.name}</h4>
                  </div>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
