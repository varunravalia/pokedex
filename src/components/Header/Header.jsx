import React from "react";
import labels from "../../labels/label.json";
import "./Header.css";

function Nav() {
  return (
    <header className="header">
      <h1 className="header-brandName">{labels?.brandName}</h1>
      <h2 className="header-tagline">{labels?.header?.brandTag}</h2>
    </header>
  );
}

export default Nav;
