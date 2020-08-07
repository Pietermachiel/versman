import React from 'react';
import AddBtn from './add-btn';
import RemoveBtn from './remove-btn';
import { connect } from 'react-redux'
import { capitalize, afgerond, slugify, uppercase, lowercase, today, theweek } from '../common/common';

export class AssortimentItems extends React.Component {
  render() {
    const { addToCart, removeFromCart, products, countries, cart } = this.props
    const { activeLocation, usort } = this.props
    // console.log(this.props);
    return (
      <div>
        {products.map( (item, idx) => {
          const thelocation = [];
          countries.map(c => item.country.name === c.name ? thelocation.push(c.location) : null )
          let hetland = slugify(thelocation);
          
          let cartItem = cart.filter(cartItem => cartItem._id === item._id)[0]
          let theprice = afgerond(item.price);
          let theActiveLocation = slugify(activeLocation);
          let capcountry = uppercase(item.country.name);   
          if (hetland !== theActiveLocation && theActiveLocation !== '100%-bio' ) return null;
          if (usort === item.sort.name) 
          return (
            <div key={idx} className={"bestellen-box bg_" + hetland }>
                <p className={"title colord_" + hetland }>{item.title}</p>
                <p className="unit grijs-40">{item.unit}</p>
                <p className={"country colord_" + hetland }>{capcountry}</p>
                <p className="price black">{theprice}</p>              

                <div className="bestellen-input">
                  {
                    cartItem
                      ? <RemoveBtn
                        cartItem={cartItem}
                        product={item}
                        removeFromCart={removeFromCart}
                      />
                      : null
                  }
                  <AddBtn
                    cartItem={cart.filter(cartItem => cartItem._id === item._id)[0]}
                    product={item}
                    addToCart={addToCart}
                  />      
              </div>
            </div>                          
          )
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {   // maps products from redux store on to our props
  return {
    cart: state.cart,
    products: state.products,
    countries: state.countries,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToCart: (item) => {
      dispatch({ type: 'ADD', payload: item })
    },
    removeFromCart: (item) => {
      dispatch({ type: 'REMOVE', payload: item })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssortimentItems)
