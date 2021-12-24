import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { v1 as uuidv1 } from "uuid";
import Data from "../Data.js";

export default function List() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    var url = new URL(window.location.href);
    setData(Data.items);
    setCategory([...new Set(Data.items.map(({ category }) => category))]);
    setIsAdmin(url.searchParams.get("admin") ? true : false);
  }, []);

  function filterData(category) {
    let newData = JSON.parse(localStorage.getItem("data"));
    if (category === "*") {
      setData(newData.items);
    } else {
      setData(newData.items.filter((product) => product.category === category));
    }
  }

  function sortData(sortType) {
    let newData = JSON.parse(localStorage.getItem("data"));
    setData(
      newData.items.sort(function (a, b) {
        return a[sortType].localeCompare(b[sortType]);
      })
    );
  }

  function addItems(e) {
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
    setData(newData.items);
    setCategory([...new Set(newData.items.map(({ category }) => category))]);
    document.getElementById("closeButton").click();
    e.target.reset();
  }

  function deleteData(id) {
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
    setData(newData);
    setCategory([...new Set(newData.map(({ category }) => category))]);
  }

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
                      onClick={(event) => sortData("name")}
                    >
                      Name
                    </a>
                    <a
                      className="dropdown-item"
                      href="javascript:void(0)"
                      onClick={(event) => sortData("category")}
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
                      onClick={(event) => filterData("*")}
                    >
                      All
                    </a>

                    {category.map((cat) => (
                      <a
                        className="dropdown-item"
                        href="javascript:void(0)"
                        onClick={(event) => filterData(cat)}
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
              <div className="featured-item row">
                <div className="col-md-12">
                  <NavLink to={"/product/" + item.id}>
                    <img src={item.image} alt={"Product " + index + 1} />
                  </NavLink>
                </div>

                <div className="col-md-8">
                  <h4>{item.name}</h4>
                  <h6>{item.category}</h6>
                </div>
                <div className="col-md-4">
                  {isAdmin ? (
                    <h4>
                      <button
                        className="btn btn-danger"
                        onClick={(event) => deleteData(item.id)}
                      >
                        Delete
                      </button>
                    </h4>
                  ) : (
                    ""
                  )}
                </div>
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
                  addItems(event);
                }}
                encType="multipart/form-data"
              >
                <div className="modal-header">
                  <h4 className="modal-title">Add New DVD</h4>
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
