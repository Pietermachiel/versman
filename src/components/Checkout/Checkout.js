import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet';
import fetchApi from '../common/fetch-api'

// import LoginForm from './LoginForm';
// import PostcodeForm from './PostcodeForm';
// import CheckoutForm from './CheckoutForm'
import CheckoutItems from './CheckoutItems';
// import PostcodeForm_basis from './PostcodeForm_basis';

function submitOrder(values, cart) {
  const { email, name } = values.order

  fetchApi('post', "https://student-example-api.herokuapp.com/v1/orders.json", {
    order: {
      name,
      email,
      order_items_attributes: cart.map(item => ({
        product_id: item.id,
        qty: item.quantity,
      }))
    }
  }).then(json => {
    if(json.errors) {
      alert('something went wrong!')
      return
    }
    document.location.href = `/orders/${json.id}`
  })
}


export class Checkout extends React.Component {
  constructor(props, context) {
    super(props, context);
 
    this.state = {
      visible: false,
      isSwitchOn: false
    };
 
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleMouseDown(e) {
    // e.stopPropagation();
    this.toggleMenu();
    this.toggleSwitch();
  }

  toggleMenu() {
    this.setState(
      {
        visible: true
      }
    );
  }

  toggleSwitch() {
    this.setState(
      {
        isSwitchOn: true
      }
    );
  }

  onSubmit(e) {
    e.stopPropagation();
    console.log("on submit")
  }
 

  render() {
    const { cart } = this.props
    var isOn = this.state.isSwitchOn;

    return (
      <React.Fragment>
        <Helmet>
          <html className={ isOn ? "menu-open" : null } />
        </Helmet>
        <div className="container">
          <h2>Mijn bestelling</h2>        
        </div>
        <CheckoutItems />
      </React.Fragment>
    )    
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
  }
}
export default connect(mapStateToProps)(Checkout)