import React, { Component } from "react";
import { NavLink, withRouter } from 'react-router-dom'
import { NavPanel } from './NavPanel';
import { LogoButton } from './LogoButton';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux'

export class NavContainer extends Component {

  constructor(props, context) {
    super(props, context);
 
    this.state = {
      visible: false
    };
 
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  handleMouseDown(e) {
    this.toggleMenu();
    this.toggleSwitch();
    e.stopPropagation();
  }
 
  toggleMenu() {
    this.setState(
      {
        visible: !this.state.visible
      }
    );
  }

  toggleSwitch() {
    this.setState(
      {
        isSwitchOn: !this.state.isSwitchOn
      }
    );
  }

  render() {

    var isOn = this.state.isSwitchOn;

    return (
      <header>
        <Helmet>
          <html className={ isOn ? "menu-open" : null } />
        </Helmet>
        <nav className={ isOn ? "navbox navbox--menu-open" : "navbox"} >
            <button 
              onClick={this.handleMouseDown} 
              className={ isOn ? "hamburger navbox--menu-open" : "hamburger"} 
              aria-label="Open Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>              
            <LogoButton 
              isOn = {isOn}
            />
            <NavPanel 
              { ...this.props } 
              isOn = {isOn}
              handleMouseDown={this.handleMouseDown}
              menuVisibility={this.state.visible} 
            />
      
          </nav>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
  }
}

export default withRouter(connect(mapStateToProps)(NavContainer));