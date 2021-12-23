import React from "react";
import { Redirect } from "react-router-dom";
import Data from "../Data.js";

class Product extends React.Component {
  state = {
    product: {},
    error: false,
    isAdmin: false,
  };

  componentDidMount() {
    if (typeof this.props.match.params.id !== "undefined") {
      let product = Data.items.find((p) => p.id == this.props.match.params.id);
      let url = new URL(window.location.href);
      let isAdmin = url.searchParams.get("admin") ? true : false;
      product
        ? this.setState({ product, error: false, isAdmin })
        : this.setState({ error: true, isAdmin });
    }
  }

  deleteData(id) {
    let newData = JSON.parse(localStorage.getItem("data"));
    newData = newData.items.filter(function (obj) {
      return obj.id !== id;
    });
    localStorage.setItem(
      "data",
      JSON.stringify({
        items: newData,
      })
    );
    window.location.href = "/";
  }

  render() {
    const { product, error, isAdmin } = this.state;
    return error ? (
      <Redirect to="/" />
    ) : (
      <div className="featured-items">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="section-heading">
                <div className="line-dec"></div>
                <h1>Product</h1>
              </div>
            </div>
            <div className="col-sm-6" style={{ height: "fit-content" }}>
              <img src={product.image} alt="" className="product-image" />
            </div>
            <div className="col-sm-6" style={{ height: "fit-content" }}>
              <div className="right-content">
                <h4>{product.name}</h4>
                <h6>{product.category}</h6>
                <div>
                  {isAdmin ? (
                    <button
                      className="btn btn-danger"
                      onClick={() => this.deleteData(product.id)}
                    >
                      Delete
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
