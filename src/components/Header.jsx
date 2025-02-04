import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-light">
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              Student Management System
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/"
                  >
                    Students
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/class-view">
                    Classes
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/school-view">
                    School
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/teachers">
                    Teachers
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
