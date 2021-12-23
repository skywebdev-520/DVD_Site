import { NavLink } from "react-router-dom";
function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/">
                Home
                <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item active">
              <NavLink className="nav-link" to="/list">
                List
                <span className="sr-only">(current)</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
