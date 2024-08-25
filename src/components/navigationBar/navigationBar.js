"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navigationBar.module.scss";

const navLinks = [
  "/",
  "/blog",
  "/about",
  //   "/projects", // to add later
  "/contact",
];

const NavigationBar = () => {
  const pathname = usePathname();

  const kebabToTitle = (str) => {
    return str
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const isActiveLink = (href) => {
    return pathname === href ? "page" : undefined;
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.navBarContents}>
        <ul className={styles.navLinks}>
          {navLinks.map((slug, index) => (
            <li key={index}>
              <Link
                href={slug}
                aria-current={isActiveLink(slug)}
                className={styles.link}
              >
                {slug === "/" ? "Home" : kebabToTitle(slug.replace("/", ""))}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavigationBar;
