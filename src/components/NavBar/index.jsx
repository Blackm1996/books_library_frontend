import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function Navbar(props) {
  const { isLoggedIn } = props;

  return (
    <nav>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {isLoggedIn ? <Link to="/HomeUser">HomeUser</Link> : null}
        {isLoggedIn ? "Logout" : <Link to="/login">Login</Link>}
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default connect(mapStateToProps)(Navbar);
