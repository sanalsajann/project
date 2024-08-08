import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import "./HomeAppBarAlt.css";
import { Box, Typography } from "@mui/material";

const NavbarHook = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: "1150px" });
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMobileMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };
  const renderNavLinks = () => {
    const listClassName = isMobile ? "nav__list" : "nav__list__web";
    const linkClassName = "nav__link";
    const buttonClassName = "nav__cta";
    return (
      <>
        <Box sx={{
          flexGrow: 1,
          display: 'flex',
          marginLeft: '500px'
        }}>
          <Typography sx={{position: 'absolute',
            top: '25%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000}} id='HomeAppBarcentertext'>
            EventX - Home
          </Typography>
        </Box>
        <ul className={listClassName}>
          <li>
            <NavLink
              to="/Loginpage"
              className={`${linkClassName} ${buttonClassName}`}
              onClick={closeMobileMenu}
            >
              Get Started
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={`${linkClassName} ${buttonClassName}`}
              onClick={closeMobileMenu}
            >
              Profile
            </NavLink>
          </li>
        </ul>
      </>
    );
  };
  const renderMenuLinks = () => {
    const listClassName = isMobile ? "nav__list" : "nav__list__web";
    const linkClassName = "nav__link";
    return (
      <ul className={listClassName}>
        <li>
          <NavLink
            to="/Aboutus"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            About Us
          </NavLink>
        </li>
        <li>
          <a
            href="https://www.google.com/maps/place/Thiruvananthapuram,+Kerala/@8.5000379,76.7593516,11z/data=!3m1!4b1!4m6!3m5!1s0x3b05bbb805bbcd47:0x15439fab5c5c81cb!8m2!3d8.5241391!4d76.9366376!16zL20vMGZrOTg?entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Location
          </a>
        </li>
      </ul>
    );
  };
  return (
    <header className="header">
      <nav className="nav container">
        <div className="nav__logo" onClick={toggleMenu}>
          Menu
          {isMenuOpen ? <IoClose style={{ marginLeft: 10 }} /> : <IoMenu style={{ marginLeft: 10 }} />}
        </div>
        {isMenuOpen && (
          <div
            className={`nav__menu  ${isMenuOpen ? "show-menu" : ""}`}
            id="nav-menu"
          >
            {renderMenuLinks()}
          </div>
        )}
        {renderNavLinks()}
      </nav>
    </header>
  );
};
export default NavbarHook;