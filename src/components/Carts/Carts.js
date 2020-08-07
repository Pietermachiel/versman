import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from  'react-redux'
import CartItems from './CartItems'

export class Carts extends React.Component {

  render() {

    const { cart } = this.props;

    console.log("cart.length");
    console.log(cart.length);

    return (
      <React.Fragment>
        <div className="container">
          <div className="carts-title">
            <h2>Mijn boodschappen &nbsp;<input type="text" placeholder="Kies nog een product, bijv. 'Appels'"/></h2>
            {
              cart.length === 0 
              ? 
              <React.Fragment>
                <p>Je hebt nog geen boodschappen.</p>
                <h5 style={{ color: '#43C631' }}>
                  Ga naar <Link to="/assortiment">Shop</Link> en kies uit het aanbod
                </h5>              
              </React.Fragment>
              :
              null            
            }
          </div>
        </div>

        {
          cart.length > 0 
          ? 
          <React.Fragment>

            <CartItems cart={cart}/>

            <div className="container">
              <Link 
                to="/Checkout"
              >
                <button className="btn-zetopmijnlijst bg100_nederland" >
                  Order >
                </button>
              </Link>
            </div>
          </React.Fragment>
          :
          null            
        }


      </React.Fragment>      
    )}    
  }



function mapStateToProps(state) {
  return {
    cart: state.cart,
  }
}

export default connect(mapStateToProps)(Carts)