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
    this.setState({
      data: newData,
      category: [...new Set(newData.map(({ category }) => category))],
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
                  {isAdmin ? (
                    <button
                      className="btn btn-info"
                      data-toggle="modal"
                      data-target="#myModal"
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
