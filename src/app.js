import React, { Component } from "react";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import NavContainer from "./components/Navigation/NavContainer";
import Home from "./components/Home/Home";
import Mapbox from "./components/Home/Mapbox";
import LoginForm from "./components/Login/LoginForm";
import NewForm from "./components/Login/NewForm";
import SignupForm from "./components/Login/SignupForm";
import TestForm from "./components/Login/TestForm";
import Offer from "./components/Offer/Offer";
import Assortiment from "./components/Assortiment/Assortiment";
import Abouts from "./components/About/Abouts";
import About from "./components/About/About";
import Recepten from "./components/Recepten/Recepten";
import Recept from "./components/Recepten/Recept";
import Sorts from "./components/Products/Sorts";
import Sort from "./components/Products/Sort";
import Product from "./components/Products/Product";
import Footer from "./components/Footer/Footer";
import Carts from './components/Carts/Carts'
import Checkout from './components/Checkout/Checkout'
import Test from "./components/Test/Test";
import LightSwitch from "./components/Test/LightSwitch";
// import Movies from "./components/Test/Movies";
import NotFound from "./components/NotFound";
import { hot } from 'react-hot-loader/root';

class App extends Component {

  componentDidMount() {
    console.log("Mounted");

    const { loadCategories } = this.props
    fetch("https://versman-api.herokuapp.com/api/categories")
    .then(response => response.json())
    .then((json => {
      loadCategories(json)
    }))  

    const { loadSorts } = this.props
    fetch('https://versman-api.herokuapp.com/api/sorts')
    .then(response => response.json())
    .then((json => {
      loadSorts(json)
    }))  

    const { loadProducts } = this.props
    fetch('https://versman-api.herokuapp.com/api/products')
    .then(response => response.json())
    .then((json => {
      loadProducts(json)
    }))  

    const { loadCountries } = this.props
    fetch('https://versman-api.herokuapp.com/api/countries')
    .then(response => response.json())
    .then((json => {
      loadCountries(json)
    }))  

    const { loadRecipes } = this.props
    fetch("https://hetkookt.nl/api/recipes.json")
    .then(response => response.json())
    .then((json => {
      loadRecipes(json)
    }))  


  }

  render() {
    return (
        <React.Fragment>
          <NavContainer { ...this.props } />
          <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/mapbox" component={Mapbox} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/testform" component={TestForm} />
            <Route exact path="/new" component={NewForm} />
            <Route exact path="/signup" component={SignupForm} />
            <Route exact path="/offer" component={Offer} />
            <Route path="/assortiment" component={Assortiment} />
            <Route exact path="/about" component={Abouts} />
            <Route path="/about/:url" component={About} />
            <Route exact path="/recepten" component={Recepten} />
            <Route path="/recepten/:url" component={Recept} />
            <Route exact path='/sorts' component={Sorts}/>            
            <Route path='/sorts/:url' component={Sort}/>            
            <Route path='/products/:url' component={Product}/>
            <Route exact path='/carts' component={Carts} />
            <Route exact path='/checkout' component={Checkout} />
            <Route exact path="/test" component={Test} />
            <Route exact path="/switch" component={LightSwitch} />
            {/* <Route exact path="/movies" component={Movies} /> */}
            {/* <Route exact path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />         */}
          </Switch>
          </div>
          <Footer />          
        </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadCategories: (thecategories) => {
      dispatch({ type: 'LOAD_CATEGORIES', payload: thecategories })
    },
    loadSorts: (thesorts) => {
      dispatch({ type: 'LOAD_SORTS', payload: thesorts })
    },    
    loadProducts: (products) => {
      var saleProducts = [];
      products.forEach(cat => {
          if (cat.sale === true)
          saleProducts.push(cat);
      });
      dispatch({ type: 'LOAD_PRODUCTS', payload: saleProducts })
    },
    loadRecipes: (therecipes) => {
      dispatch({ type: 'LOAD_RECIPES', payload: therecipes })
    },
    loadCountries: (countries) => {
      dispatch({ type: 'LOAD_COUNTRIES', payload: countries })
    },    
    addToCart: (item) => {
      dispatch({ type: 'ADD', payload: item })
    },
    removeFromCart: (item) => {
      dispatch({ type: 'REMOVE', payload: item })
    },
  }
}

export default hot(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));
