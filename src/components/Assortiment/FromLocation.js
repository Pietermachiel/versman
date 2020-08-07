import React, { Component } from "react";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { capitalize, afgerond, slugify, uppercase, lowercase, today, theweek } from '../common/common';

export class FromLocation extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (item) => {
        this.props.onChange(item);
        console.log("item");
    }
    
    render() {
        const locations = ["100% bio", "Nederland", "Europa", "Wereld"];
        // console.log(uniqueCategory);
        const { addToCart, removeFromCart, products, countries, cart } = this.props

        return (
            <React.Fragment>
                
                <div className="container">
                    <div className="locations_shop-box">
                    {locations.map((item, id) => {
                        let hetland = slugify(item);
                        let hetaantal = [];
                        // console.log("het aantal: " + hetaantal.length);
                        return (
                        <div key={id} 
                            className="countries_shop" 
                            onClick= {() => this.handleChange(item)}
                        >
                            {/* {products.map(prod => {
                                if (prod.location === item)
                                hetaantal.push(prod.title);
                            })}  */}

                            {products.map(prod => {
                                const loc = [];
                                countries.map(c => prod.country.name === c.name ? loc.push(c.location) : null )
                                if (loc[0] === item)
                                hetaantal.push(prod.title)
                            })} 

                            <button className={"btn-product bg100_" + hetland }></button> 
                            { item !== "100% bio" ? <strong className={"color_" + hetland }>&nbsp;&nbsp;{hetaantal.length}</strong> : null }
                            &nbsp;
                            <span className="underline">
                                { item !== "100% bio" && item !== "Wereld"? <span>uit </span> : null }
                                { item === "Wereld"? <span>uit de </span> : null }
                                { item === "100% bio"? <span className="bio">
                                    {item}
                                </span> : null }
                                { item !== "100% bio"? <span>
                                    {item}
                                </span> : null }
                                
                                &nbsp;&nbsp;
                            </span>
                        </div>
                        )
                    })}
                    </div>
                </div>
            </React.Fragment>
        );
    }
};

function mapStateToProps(state) {
    // console.log(state.products);

    return {
      cart: state.cart,
      products: state.products,
      countries: state.countries,
    }
  }
  
function mapDispatchToProps(dispatch) {
    return {
        loadProducts: (products) => {
        dispatch({ type: 'LOAD', payload: products })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FromLocation)