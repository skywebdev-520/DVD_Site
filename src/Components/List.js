/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink } from "react-router-dom";
import { v1 as uuidv1 } from "uuid";
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

  addItems(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let newData = JSON.parse(localStorage.getItem("data"));
    let addData = {
      id: uuidv1(),
      name: formData.get("name"),
      category: formData.get("category"),
      image: formData.get("image"),
      featured: formData.get("featured") === "on" ? true : false,
    };
    newData.items.push(addData);
    localStorage.setItem("data", JSON.stringify(newData));
    this.setState({
      data: newData.items,
      category: [...new Set(newData.items.map(({ category }) => category))],
    });
    document.getElementById("closeButton").click();
    e.target.reset();
  }
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
                  <span className="dropdown" style={{ marginRight: "10%" }}>
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Sort By
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <a
                        className="dropdown-item"
                        href="javascript:void(0)"
                        onClick={() => this.sortData("name")}
                      >
                        Name
                      </a>
                      <a
                        className="dropdown-item"
                        href="javascript:void(0)"
                        onClick={() => this.sortData("category")}
                      >
                        Category
                      </a>
                    </div>
                  </span>

                  <span className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Filter By
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a
                        className="dropdown-item"
                        href="javascript:void(0)"
                        onClick={() => this.filterData("*")}
                      >
                        All
                      </a>

                      {category.map((cat) => (
                        <a
                          className="dropdown-item"
                          href="javascript:void(0)"
                          onClick={() => this.filterData(cat)}
                        >
                          {cat}
                        </a>
                      ))}
                    </div>
                  </span>
                  {isAdmin ? (
                    <button
                      className="btn btn-info"
                      data-toggle="modal"
                      data-target="#myModal"
                      style={{ marginLeft: "10%" }}
                    >
                      Add
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="featured container no-gutter">
          <div className="row posts">
            {data.map((item, index) => (
              <div key={index + 1} className="item new col-md-4">
                <div className="featured-item">
                  <NavLink to={"/product/" + item.id}>
                    <img src={item.image} alt={"Product " + index + 1} />
                  </NavLink>
                  <h4>{item.name}</h4>
                  <h6>{item.category}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isAdmin ? (
          <div className="modal fade" id="myModal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <form
                  className="addForm"
                  onSubmit={(event) => {
                    this.addItems(event);
                  }}
                  encType="multipart/form-data"
                >
                  <div class="modal-header">
                    <h4 class="modal-title">Add New DVD</h4>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="exampleInputName">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputName"
                        placeholder="Name"
                        name="name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputCategory">Category</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputCategory"
                        placeholder="Category"
                        name="category"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputImage">Image URL</label>
                      <textarea
                        className="form-control"
                        id="exampleInputImage"
                        placeholder="Url"
                        name="image"
                        required
                      ></textarea>
                    </div>
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="Featured"
                        name="featured"
                      />
                      <label className="form-check-label" htmlFor="Featured">
                        Featured
                      </label>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <input
                      type="submit"
                      className="btn btn-primary"
                      name="Save"
                    />
                    <button
                      type="button"
                      id="closeButton"
                      className="btn btn-default"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default List;
