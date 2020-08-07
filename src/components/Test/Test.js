import React, { Component } from 'react'
import { connect } from 'react-redux';

export class Test extends Component {

    render() {

        const products = this.props.products;
        let countries = this.props.countries;
        console.log("countries");
        console.log(countries);
        console.log(this.props);
    
        const countriesArray = [];
        products.map(hit => {
          const x = hit.country.name;
          countriesArray.indexOf(x) === -1 ? countriesArray.push(x) : null;
        });
        console.log(countriesArray);
    
        var theCountries = [];
        countriesArray.map(hit => {
          var coordinates = [];
          countries.forEach(e => {
            const countryname = e.name;
            // hit === countryname ? console.log(countryname) : null;
            var coo =  [e.lng, e.lat]
            hit === countryname ? coordinates.push(coo) : null;
          });
          var theproducts = [];
          products.forEach(e => {
            const countryname = e.country.name;
            // hit === countryname ? console.log(countryname + e.product) : null;
            var prod = e.sort;
            if ( e.sale === true ){
              hit === countryname ? theproducts.indexOf(prod) === -1 ? theproducts.push(prod) : null : null ;
            };
          })
          var country = {
            'name': hit,
            'coordinates': coordinates,
            'products': theproducts
          }
        theCountries.push(country);
        })
    
        console.log(theCountries);
        console.log(countriesArray);
    
        var thefeatures = [];
        theCountries.forEach(element => {
          var feature = {
            'type' : 'Feature',
            'geometry' : {
              'type' : 'Point',
              'coordinates' : element.coordinates[0]
            },
            'properties' : {
              'country' : element.name,
              'products' : element.products,
              'number' : element.products.length
            }
          }
          thefeatures.push(feature)
        })
    
        console.log("thefeatures");
        console.log(thefeatures);

    return (
        <React.Fragment>
        <div className="container">
           Test
           {thefeatures.map( (hit, id) => {
               return (
                  <p>{hit.properties.country}</p>
               )
           })}
        </div>        
        </React.Fragment>
    );
    }
}

function mapStateToProps(state) {   // maps products from redux store on to our props
    return {
      // cart: state.cart,
      products: state.products,
      thesorts: state.thesorts,
      thecategories: state.thecategories,
      countries: state.countries,
    }
  }
  
  
  export default connect(mapStateToProps)(Test)