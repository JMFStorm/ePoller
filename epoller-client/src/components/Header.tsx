import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";

import { AppContext } from "../services/AppContext";

const Header: FC = () => {
  // App context
  const { selectedPage, setSelectedPage } = useContext(AppContext);

  // Get selected style
  const selectedStyle = (current: string) => {
    return current === selectedPage
      ? {
          fontWeight: 700,
          textDecoration: "underline",
        }
      : {};
  };

  // Return JSX
  return (
    <header className="header">
      <div className="header__title">
        <h1 className="title h1">ePoll</h1>
      </div>
      <nav className="header__nav">
        <ul className="nav-list">
          <li className="nav-list__item">
            <Link
              style={selectedStyle("list-polls")}
              to="/list-polls"
              onClick={(e) => {
                setSelectedPage("list-polls");
              }}
            >
              View Polls
            </Link>
          </li>
          <li className="nav-list__item">
            <Link
              style={selectedStyle("create-poll")}
              to="/create-poll"
              onClick={(e) => {
                setSelectedPage("create-poll");
              }}
            >
              Create New
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
