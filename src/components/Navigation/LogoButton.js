import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

export class LogoButton extends Component {
  render() {
    var isOn = this.props.isOn;
    return (
      // <a className="navbox-logo" href="/">
      <NavLink className="navbox-logo"  to="/">
      { isOn ? <img src="/public/img/icons/versman-nav-wit.svg" alt="" /> : <img src="/public/img/icons/versman-nav.svg" alt="" /> }
      </NavLink>
      // </a>
    );
  }
}
 
