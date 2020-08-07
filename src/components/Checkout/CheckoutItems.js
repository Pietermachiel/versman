import React from 'react'
import { connect } from  'react-redux'
import { capitalize, afgerond, slugify, uppercase, lowercase, today, theweek } from '../common/common';
import AddBtn from '../Assortiment/add-btn';
import RemoveBtn from '../Assortiment/remove-btn';

const sort = (items) => {
  return items.sort((a, b) => a.id - b.id)
}

function CheckoutItems(props) {
  var totaltotal = 0;
  var totaltotalx = 0;
  var totaltotaly = parseFloat(0).toFixed(2);
  const activeLocation = "100% bio";
  return (
  <React.Fragment> 
    {/* <h4>New cart table</h4> */}
    {
      sort(props.cart).map( (item, id) => {
        let cartItem = props.cart.filter(cartItem => cartItem.id === item.id)[0]
        let theprice = afgerond(item.price);
        let hetland = slugify(item.location);
        let theActiveLocation = slugify(activeLocation);
        let capcountry = uppercase(item.country.name);   

        var total = theprice * item.quantity;
        var total2 = parseFloat(total).toFixed(2);    // Number.parseFloat(total).toFixed(2);
        totaltotal += theprice * item.quantity;
        var totaltotal2 = parseFloat(totaltotal).toFixed(2)
        totaltotalx = totaltotal2;
        var x = 5;
        totaltotaly = parseFloat(+totaltotalx + +x).toFixed(2);

        return (
          <React.Fragment key={id}>
          <div className={"bestellen-box bg_" + hetland }>
            <p className={"title colord_" + hetland }>{item.quantity} {item.title} <span className="unit grijs-40">{item.unit} &nbsp;<span>{item.price}</span></span></p>
            {/* <p className={"country colord_" + hetland }>{capcountry}</p> */}
            <p className="price black">{total2}</p>    
            {/* <div className="bestellen-input">
                {
                  cartItem
                    ? <RemoveBtn
                      cartItem={cartItem}
                      product={item}
                      removeFromCart={props.removeFromCart}
                    />
                    : null
                }
                <AddBtn
                  cartItem={props.cart.filter(cartItem => cartItem.id === item.id)[0]}
                  product={item}
                  addToCart={props.addToCart}
                />      
            </div>   */}
          </div>      
          </React.Fragment>
        )
      })
    }

    {/* <br/> */}

    <div className="orders-box">
      <p className="price-bezorgen"><span>bezorgkosten</span> 5.00</p>
      <p className="price-totaal">Totaal te betalen € {totaltotaly}</p>

    </div>

  </React.Fragment>
  )
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToCart: (item) => {
      dispatch({ type: 'ADD', payload: item })
    },
    removeFromCart: (item) => {
      dispatch({ type: 'REMOVE', payload: item })
    },
    removeAllFromCart: (item) => {
      dispatch({ type: 'REMOVE_ALL', payload: item })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutItems)