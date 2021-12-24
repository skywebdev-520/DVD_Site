import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Data from "../Data.js";

export default function Product({ match }) {
  const [product, setProduct] = useState({});
  const history = useHistory();

  useEffect(() => {
    let product = Data.items.find((p) => p.id == match.params.id);
    if (product) {
      setProduct(product);
    } else {
      history.goBack();
    }
  }, []);

  return (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
