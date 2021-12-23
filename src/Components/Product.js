import React from "react";
import { Redirect } from "react-router-dom";
import Data from "../Data.js";

class Product extends React.Component {
  state = {
    product: {},
    error: false,
  };

  componentDidMount() {
    if (typeof this.props.match.params.id !== "undefined") {
      var product = Data.items.find((p) => p.id == this.props.match.params.id);
      product
        ? this.setState({ product, error: false })
        : this.setState({ error: true });
    }
  }

  render() {
    const { product, error } = this.state;
    return error ? (
      <Redirect to="/" />
    ) : (
      <div className="single-product">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <div className="line-dec"></div>
                <h1>Product</h1>
              </div>
            </div>
            <div className="col-md-6">
              <img src={product.image} alt="" className="product-image" />
            </div>
            <div className="col-md-6">
              <div className="right-content">
                <h4>{product.name}</h4>
                <h6>{product.category}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
