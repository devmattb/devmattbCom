import React, { Component } from 'react';

// Navbar component - represents our navbar
export default class NavComponent extends Component {

  render() {
    return (
      <div>
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper z-depth-2 black">
            <a href="/" style={{marginLeft: "10px", marginTop: "-8px"}} className="brand-logo hide-on-med-and-down">
              <img style={{width: "140px"}}src="../img/logo_white_transparent.png" />
            </a>
            <a href="/" style={{marginTop: "-10px"}} className="brand-logo hide-on-large-only hide-on-small-only">
              <img style={{width: "140px"}}src="../img/logo_white_transparent.png" />
            </a>
            <a href="/" style={{marginTop: "-13px"}} className="brand-logo hide-on-med-and-up" >
              <img style={{width: "140px"}} src="../img/logo_white_transparent.png" />
            </a>
            <a href="#" data-target="slide-out" className="sidenav-trigger right"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down black" id="desktop-demo">
              <li id="homeNavItem"><a href="/">HOME</a></li>
              <li id="flowNavItem"><a href="/case">CASE</a></li>
              <li id="projectNavItem"><a href="/videos">VIDEOS</a></li>
              <li id="reflectionNavItem"><a className='dropdown-trigger' href='#' data-target='dropdown1'>MORE<i className="material-icons right">arrow_drop_down</i></a></li>
              <ul id='dropdown1' className='dropdown-content'>
                <li><a href="#!">FAQ</a></li>
                <li className="divider hide-on-med-and-down" tabIndex="-1"></li>
                <li><a href="#!">ASK ME!</a></li>
                <li className="divider hide-on-med-and-down" tabIndex="-1"></li>
                <li><a href="#!">FLOW</a></li>
                <li className="divider hide-on-med-and-down" tabIndex="-1"></li>
                <li><a href="#!">CONTACT</a></li>
              </ul>
            </ul>

          </div>

        </nav>
      </div>

      <ul id="slide-out" className="sidenav">
        <li>
            <a href="/">
                <i className="fa fa-home webTextOrange" aria-hidden="true"></i>
                HOME
            </a>
        </li>
        <li>
            <a href="/case">
                <i className="fa fa-star webTextOrange" aria-hidden="true"></i>
                CASE
            </a>
        </li>
        <li>
            <a href="/videos">
                <i className="fa fa-laptop webTextOrange" aria-hidden="true"></i>
                VIDEOS
            </a>
        </li>
        <li><a className='dropdown-trigger' href='#' data-target='dropdown2'>MORE <i className="material-icons right">arrow_drop_down</i></a></li>
        <ul id='dropdown2' className='dropdown-content'>
          <li><a href="#!">FAQ</a></li>
          <li><a href="#!">ASK ME!</a></li>
          <li><a href="#!">FLOW</a></li>
          <li><a href="#!">CONTACT</a></li>
        </ul>
      </ul>

      </div>
    );
  }
}
