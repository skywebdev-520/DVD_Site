import { NavLink } from "react-router-dom";
export default function Item({ index, item, isAdmin, deleteData }) {
  return (
    <div key={index + 1} id={index + 1} className="item new col-md-4">
      <div className="featured-item">
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
  );
}
