import React, { Component, useState } from "react";
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";

const UserPresence = (props) => {
  const managerUserPresence = () => {
    if (props.user) {
      document.cookie = "jwt=; Max-Age=0; path=/";
    }
  }


  if (props.user) {
    return (
      <span>
        <a className="nav-link" href="/" onClick={managerUserPresence}>
          <i className="bi bi-box-arrow-right"></i>Logout</a>
      </span>
    );
  } else {
    return (
      <Link className="nav-link" to={'/Login'}>
        <i className="bi bi-box-arrow-right"></i>Login
      </Link>
    );
  }
}

const UserProfile = (props) => {
  if (props.user) {
    return (
      <Link className="nav-link" to={'/Profile'}>
        <i className="bi bi-person-fill"></i>{props.user.name}</Link>
    )
  } else {
    return null;
  }
}

const Header = (props) => {
  const [isNavCollapsed,setIsNavCollapsed]= useState(true);
  const handleNavCollapse =()=> setIsNavCollapsed(!isNavCollapsed);

  return (
    <div className="container-fluid top-1em-padding" >
      <header className="py-0">
        <div className="container-fluid">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link to={"/"}>
              <img height="100px" src={process.env.PUBLIC_URL + '/images/logo.png'} alt="logo"></img>
            </Link>
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            </ul>
            <div className="divider"></div>
            <nav className="navbar navbar-expand-md topNavBar ">
                <button
                  className="navbar-toggler ms-auto"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#toggleSmallScreen"
                  aria-controls="toggleSmallScreen"
                  aria-expanded={!isNavCollapsed ? true : false}
                  aria-label="Toggle Navigation"
                  onClick={handleNavCollapse}
                >
                  <span className="bi bi-three-dots-vertical"></span>
                </button>
                <div class={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="toggleSmallScreen">
                  <ul className="navbar-nav ms-auto text-left main-theme-text-color">
                  <li>
                    <UserPresence user={props.user}></UserPresence>
                  </li>
                  <li>
                    <UserProfile user={props.user}></UserProfile>
                  </li>
                  <li>
                    <Link to="/Appointments" className="btn btn-primary"><i className="bi bi-star-fill"></i>My Appointments</Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
