import React from "react";
import { Link } from "react-router-dom";

import GoogleAuth from "./GoogleAuth";

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Home
      </Link>
      <div className="right menu">
        <Link to="/streams/new" className="item">
          <button className="ui green plus button">
            <i className="plus icon" />
            Add Tracking
          </button>
        </Link>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
