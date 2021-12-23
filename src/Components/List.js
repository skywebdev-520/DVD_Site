import React from "react";
import { NavLink } from "react-router-dom";
import Data from "../Data.js";

class List extends React.Component {
  state = {
    data: [],
    category: [],
    isAdmin: false,
  };

  componentDidMount() {
    var url = new URL(window.location.href);

    this.setState({
      data: Data.items,
      category: [...new Set(Data.items.map(({ category }) => category))],
      isAdmin: url.searchParams.get("admin") ? true : false,
    });
  }

  filterData(category) {
    let newData = JSON.parse(localStorage.getItem("data"));
    if (category === "*") {
      this.setState({
        data: newData.items,
      });
    } else {
      this.setState({
        data: newData.items.filter((product) => product.category === category),
      });
    }
  }

  sortData(sortType) {
    let newData = JSON.parse(localStorage.getItem("data"));
    this.setState({
      data: newData.items.sort(function (a, b) {
        return a[sortType].localeCompare(b[sortType]);
      }),
    });
  }

  deleteData(id) {}
  render() {
    const { data, category, isAdmin } = this.state;
    return (
      <>
        <div className="featured-page">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-12">
                <div className="section-heading">
                  <div className="line-dec"></div>
                  <h1>Items</h1>
                </div>
              </div>
              <div className="col-md-8 col-sm-12">
                <div id="filters" className="button-group">
                  <button
                    className="btn btn-primary"
                    onClick={() => this.filterData("*")}
                  >
                    All Products
                  </button>
                  {category.map((cat) => (
                    <button
                      className="btn btn-primary"
                      onClick={() => this.filterData(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                  <button
                    className="btn btn-primary"
                    onClick={() => this.sortData("name")}
                  >
                    Name
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => this.sortData("category")}
                  >
                    Category
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="featured container no-gutter">
          <div className="row posts">
            {data.map((item, index) => (
              <div id={index + 1} className="item new col-md-4">
                <div className="featured-item">
                  <NavLink to={"/product/" + item.id}>
                    <img src={item.image} alt="" />
                  </NavLink>
                  <h4>{item.name}</h4>
                  <h6>{item.category}</h6>
                  {isAdmin ? (
                    <button
                      className="btn btn-danger"
                      onClick={() => this.deleteData(item.id)}
                    >
                      Delete
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default List;
