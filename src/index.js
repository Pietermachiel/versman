import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from 'react-router-scroll-top';
import App from "./app";
import "bootstrap/dist/css/bootstrap.css";
import "./style.scss";
// import "font-awesome/css/font-awesome.css";

console.log(`App works`);

import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
// import cartReducer from './components/Carts/reducer'
// import sortsReducer from './components/Products/reducer'

const categoriesReducer = (state=[], action) => {
  switch(action.type) {
    case 'LOAD_CATEGORIES':
      return action.payload
    default:
      return state
  }
}

const sortsReducer = (state=[], action) => {
  switch(action.type) {
    case 'LOAD_SORTS':
      return action.payload
    default:
      return state
  }
}

const productsReducer = (state=[], action) => {
  switch(action.type) {
    case 'LOAD_PRODUCTS':
      return action.payload
    default:
      return state
  }
}

const recipesReducer = (state=[], action) => {
  switch(action.type) {
    case 'LOAD_RECIPES':
      return action.payload
    default:
      return state
  }
}

const countriesReducer = (state=[], action) => {
  switch(action.type) {
    case 'LOAD_COUNTRIES':
      return action.payload
    default:
      return state
  }
}


// cartReducer
const cartWithoutItem = (cart, item) => cart.filter(cartItem => cartItem._id !== item._id)
const itemInCart = (cart, item) => cart.filter(cartItem => cartItem._id === item._id)[0]
// console.log("itemInCart");
// console.log(itemInCart);
const addToCart = (cart, item) => {
  const cartItem = itemInCart(cart, item)
  return cartItem === undefined
    ? [ ...cartWithoutItem(cart, item), { ...item, quantity: 1 }]
    : [ ...cartWithoutItem(cart, item), { ...cartItem, quantity: cartItem.quantity + 1 }]
}
const removeFromCart = (cart, item) => {
  return item.quantity === 1
    ? [ ...cartWithoutItem(cart, item) ]
    : [ ...cartWithoutItem(cart, item), { ...item, quantity: item.quantity - 1 } ]
}
const removeAllFromCart = (cart, item) => {
  return [ ...cartWithoutItem(cart, item) ]
}
const cartReducer = (state=[], action) => {
  switch(action.type) {
    case 'ADD':
      return addToCart(state, action.payload)
    case 'REMOVE':
      return removeFromCart(state, action.payload)
    case 'REMOVE_ALL':
      return removeAllFromCart(state, action.payload)
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  thecategories: categoriesReducer,
  thesorts: sortsReducer,
  products: productsReducer,
  therecipes: recipesReducer,
  countries: countriesReducer,
  cart: cartReducer,
  form: formReducer,
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const app = <Provider store={store}>
  <BrowserRouter>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </BrowserRouter>
</Provider>

ReactDOM.render(app, document.getElementById('app'));

module.hot.accept();
