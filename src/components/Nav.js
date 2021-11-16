import React from "react";
import { Link } from "react-router-dom"; //將a tag改成Link要先載入此模組

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          {/*<a ref="/">Home</a>  react建議把所有的a tag都改成Link*/}
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
