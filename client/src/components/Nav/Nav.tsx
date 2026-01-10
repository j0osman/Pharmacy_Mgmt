import React from "react";
import { Link } from "react-router-dom";

//stylesheets
import "./Nav.css";

const Nav: React.FC = () => {
    return (
        <div className="nav">
            <Link to="/" style={{ textDecoration: "none" }}>
                <h1 className="logo">Pharma</h1>
            </Link>
            <ul className="linklist">
                <li>
                    <Link to="/sell" style={{ textDecoration: "none" }}>
                        <span className="sale">Sell</span>
                    </Link>
                </li>
                <li>
                    <Link to="/account" style={{ textDecoration: "none" }}>
                        <span className="accountlink">Account</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Nav;