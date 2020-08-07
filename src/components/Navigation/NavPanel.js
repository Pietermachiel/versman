import React, { Component } from "react";
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { capitalize, afgerond, slugify, uppercase, lowercase, today, theweek } from '../common/common';

export class NavPanel extends Component {
    constructor() {
      super();
      this.state = {
        width: window.innerWidth,
      };
    }
    
    componentWillMount() {
      window.addEventListener('resize', this.handleWindowSizeChange);
    }
    
    // make sure to remove the listener
    // when the component is not mounted anymore
    componentWillUnmount() {
      window.removeEventListener('resize', this.handleWindowSizeChange);
    }
    
    handleWindowSizeChange = () => {
      this.setState({ width: window.innerWidth });
    };
    
    render() {

    const { cart } = this.props;
    var isOn = this.props.isOn;

    const thequantity = cart.reduce((acc, item) => {
      return acc + item.quantity
      }, 0);
    
    // console.log(thequantity);

    const { width } = this.state;
    const isMobile = width <= 992;
    var visibility = "hide";
    var expanded = "false";
 
    if (this.props.menuVisibility) {
      visibility = "show";
      expanded = "true";
    }

    var totaltotal = 0;
    var totaltotalx = 0.00;
 
    return (
    <React.Fragment>
      <div 
        className={"navbox-panel " + visibility}
        id="navPanel"
        onClick={isMobile ? this.props.handleMouseDown : null } 
        aria-expanded= {expanded}
      >
        <ul className="navbox-panel__list" id="myDropdown">
          <li>
            <NavLink to="/assortiment">
              Shop 
            </NavLink>            
          </li>
          <li>
            <NavLink to="/sorts">
              Sorts
            </NavLink>            
          </li>            
          {/* <li>
            <NavLink to="/offer">
              Offer
            </NavLink>  
          </li>           */}
          <li>
            <NavLink to="/mapbox">
              From?
            </NavLink>  
          </li>          
          <li className="navbox-panel__login">
            <NavLink to="/login" className={ isOn ? "isopen" : null }>
              Login
            </NavLink>            
          </li>        
          <li className="navbox-panel__order">
            <NavLink to="/login" className={ isOn ? "isopen" : null }>
              Order
            </NavLink>            
          </li>           
        </ul>

      </div>

        <div className="vrachtwagen">
          
          <p className="price">
            <React.Fragment> 
            {/* <h4>New cart table</h4> */}
            {
              cart.map( (item, id) => {
                let theprice = afgerond(item.price);
                var total = theprice * item.quantity;
                var total2 = parseFloat(total).toFixed(2);    // Number.parseFloat(total).toFixed(2);
                totaltotal += theprice * item.quantity;
                var totaltotal2 = parseFloat(totaltotal).toFixed(2)
                totaltotalx = totaltotal2;
              })
            }
            {totaltotalx}
            </React.Fragment>
          </p>

          <NavLink to="/carts">
            <p className="count">{thequantity}</p>
          </NavLink>       

          {/* <img src="/public/img/icons/vrachtwagen3.svg" alt="" />        */}
        </div>  

    </React.Fragment>
    );
  }
}
 

function mapStateToProps(state) {
  return {
    cart: state.cart,
  }
}

export default withRouter(connect(mapStateToProps)(NavPanel));