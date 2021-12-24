/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import Item from "./Item";
import Modal from "./Modal";
import { v1 as uuidv1 } from "uuid";
import Data from "../Data.js";

export default function List() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    var url = new URL(window.location.href);
    localStorage.removeItem("filterData");
    setData(Data.items);
    setCategory([...new Set(Data.items.map(({ category }) => category))]);
    setIsAdmin(url.searchParams.get("admin") ? true : false);
  }, []);

  const filterData = (category) => {
    let newData = JSON.parse(localStorage.getItem("data"));
    let filterData =
      category === "*"
        ? newData.items
        : newData.items.filter((product) => product.category === category);
    localStorage.setItem("filterData", JSON.stringify(filterData));
    setData(filterData);
  };

  const sortData = (sortType) => {
    let newData = JSON.parse(localStorage.getItem("data")).items;
    let filterData = JSON.parse(localStorage.getItem("filterData"));
    let checkFilter = filterData ? filterData : newData;
    setData(
      checkFilter.sort(function (a, b) {
        return a[sortType].localeCompare(b[sortType]);
      })
    );
  };

  const addItems = (e) => {
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
  };

  const deleteData = (id) => {
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
  };

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
                      onClick={(event) => sortData("name")}
                    >
                      Name
                    </a>
                    <a
                      className="dropdown-item"
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
                      onClick={(event) => filterData("*")}
                    >
                      All
                    </a>

                    {category.map((cat, index) => (
                      <a
                        className="dropdown-item"
                        onClick={(event) => filterData(cat)}
                        key={index}
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
            <Item
              index={index}
              item={item}
              isAdmin={isAdmin}
              deleteData={deleteData}
            />
          ))}
        </div>
      </div>

      {isAdmin ? <Modal addItems={addItems} /> : ""}
    </>
  );
}
