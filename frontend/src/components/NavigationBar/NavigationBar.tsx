import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavigationBar.module.css";

const NavigationBar = () => {
  const found = 0;

  // Function to determine the class name
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink;
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.navBarContents}>
        <p>{found} / 10</p>
        <ul className={styles.navLinks}>
          <li>
            <NavLink to="/" className={getNavLinkClass} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className={getNavLinkClass}>
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects" className={getNavLinkClass}>
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={getNavLinkClass}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={getNavLinkClass}>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavigationBar;
