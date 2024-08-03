import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import "./HomeAppBarAlt.css";
import { Box, Typography } from "@mui/material";

// Documentetion : https://blog.logrocket.com/create-responsive-navbar-react-css/


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
      <Box sx=
                {{
                    flexGrow: 1,
                    display:'flex',
                    marginLeft:'500px'

                }}>
                    <Typography id='HomeAppBarcentertext'>
                    EventHub-Home
                    </Typography>
                </Box>
      <ul className={listClassName}>
        <li>
          <NavLink to="" className={linkClassName} onClick={closeMobileMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/news"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            News
          </NavLink>
        </li>
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
          <NavLink
            to="/favorite"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Favorite
          </NavLink>
        </li>
        <li>
          {/* <NavLink
            to="/location"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Location
          </NavLink> */}
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
        <li>
          <NavLink
            to="/Loginpage"
            className={`${linkClassName} ${buttonClassName}`}
            onClick={closeMobileMenu}
          >
            Get Started
          </NavLink>
        </li>
      </ul>
      </>
    );
  };
  return (
    <header className="header">
      <nav className="nav container">
        <NavLink to="/" className="nav__logo">
          Navigation Bar
        </NavLink>
        {isMobile && (
          <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
            <IoMenu />
          </div>
        )}
        {isMobile ? (
          <div
            className={`nav__menu  ${isMenuOpen ? "show-menu" : ""}`}
            id="nav-menu"
          >
            {renderNavLinks()}
            <div className="nav__close" id="nav-close" onClick={toggleMenu}>
              <IoClose />
            </div>
          </div>
        ) : (
          renderNavLinks()
        )}
      </nav>
    </header>
  );
};
export default NavbarHook;