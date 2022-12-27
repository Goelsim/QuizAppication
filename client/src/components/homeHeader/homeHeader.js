import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './header.css';

function Header(props) {
  let location = useLocation();
//   console.log(location.pathname);
  if (localStorage.getItem("loggedin")) props.setloggedin(true);

  return (
    <div className={styles.header}>
      <div className={styles.navitems}>
        <div className={styles.logo}>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            {" "}
            HOME{" "}
          </Link>
        </div>
        <div className={styles.navlinks2}>
          {location.pathname === "/login" ||
          location.pathname === "/register" ? (
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              Take Test
            </Link>
          ) : (
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              Register/Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;