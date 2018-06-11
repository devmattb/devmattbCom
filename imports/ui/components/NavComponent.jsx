import React, { Component } from 'react';

// Navbar component - represents our navbar
export default class NavComponent extends Component {

  componentDidMount(){
    $('.sidenav').sidenav();
    $('.dropdown-trigger').dropdown();
  }

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
              <li><a href="/">HOME</a></li>
              <li><a href="/case">CASE</a></li>
              <li><a href="/videos">VIDEOS</a></li>
              <li><a href="/newsletter">NEWSLETTER</a></li>
              <li><a className='dropdown-trigger' href='#' data-target='dropdownDesktop'>MORE<i className="material-icons right">arrow_drop_down</i></a></li>
              <ul id='dropdownDesktop' className='dropdown-content'>
                <li className="black"><a className="white-text" href="#!">ASK ME!</a></li>
                <li className="black"><a className="white-text" href="#!">FLOW</a></li>
                <li className="black"><a className="white-text" href="#!">CONTACT</a></li>
              </ul>
            </ul>

          </div>

        </nav>
      </div>

      <ul id="slide-out" className="sidenav">
        <li>
            <a href="/">
                <i className="fa fa-home webTextRed" aria-hidden="true"></i>
                HOME
            </a>
        </li>
        <li>
            <a href="/case">
                <i className="fa fa-briefcase webTextRed" aria-hidden="true"></i>
                CASE
            </a>
        </li>
        <li>
            <a href="/videos">
                <i className="fa fa-youtube webTextRed" aria-hidden="true"></i>
                VIDEOS
            </a>
        </li>
        <li>
            <a href="/videos">
                <i className="fa fa-paper-plane webTextRed" aria-hidden="true"></i>
                NEWSLETTER
            </a>
        </li>
        <li><a className='dropdown-trigger' href='#' data-target='dropdown2'>MORE <i className="material-icons right">arrow_drop_down</i></a></li>
        <ul id='dropdown2' className='dropdown-content'>
          <li>
            <a href="#!">
            <i className="fa fa-question webTextRed" aria-hidden="true"></i>
            FAQ & TAQ
            </a>
          </li>
          <li>
            <a href="#!">
              <i className="fa fa-user webTextRed" aria-hidden="true"></i>
              ASK ME!
            </a>
          </li>
          <li>
            <a href="#!">
              <i className="fa fa-star webTextRed" aria-hidden="true"></i>
              FLOW
            </a>
          </li>
          <li>
            <a href="#!">
              <i className="fa fa-envelope webTextRed" aria-hidden="true"></i>
              CONTACT
            </a>
          </li>
        </ul>
      </ul>

      </div>
    );
  }
}
