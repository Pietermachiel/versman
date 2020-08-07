import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { connect } from 'react-redux';
// import locations from '../common/data/locations.json';
// import assorti from '../../../public/js/assortiment_all.json';
// import countriesAll from '../common/data/countries_all.json'
import { slugify, uppercase, today } from '../common/common';

mapboxgl.accessToken = 'pk.eyJ1IjoicGlldGVybWFjaGllbCIsImEiOiJjajFxbXhicDkwMDFlMzJ0ZWlncG9vMjJuIn0.xKSVcOOz5qeMWJPVQcKj6Q';
// console.log(mapboxgl.accessToken);

export class Mapbox extends Component {
    state = {
        features: {
            type : "",
            geometry : {
                type : "",
                coordinates : ""
            },
            properties : {
                country : "",
                products : "",
                number : ""
            }
        }
    };

  populateFeatures() {
    const products = this.props.products;
    let countries = this.props.countries;
    // console.log("countries");
    // console.log(countries);
    // console.log(this.props);


    const countriesArray = [];
    products.map(hit => {
      const x = hit.country;
      countriesArray.indexOf(x) === -1 ? countriesArray.push(x) : null;
    });
    // console.log(countriesArray);

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
        const countryname = e.country;
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

    this.setState({ features: thefeatures });
  }

  async componentDidMount() {

    await this.populateFeatures();

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/pietermachiel/cjtzuubxa1m3x1fqltxyf144t',
      center: [5, 51],
      zoom: 1.3,
      scrollZoom: false
    });

    this.state.thefeatures.forEach(function(marker) {
      var capcountry = uppercase(marker.properties.country);
      var thecountry = slugify(marker.properties.country);
      var fontsize = 0;
      var x = marker.properties.number;
      switch (true) {
        case (x < 2): fontsize = 18; break;
        case (x < 3): fontsize = 21; break; 
        case (x < 5): fontsize = 24; break; 
        case (x < 10): fontsize = 36; break; 
        case (x < 20): fontsize = 48; break; 
        case (x < 25): fontsize = 60; break; 
        case (x > 24): fontsize = 72; break;
        default: break;
      }
      var popup = new mapboxgl.Popup({closeOnClick: false, className: 'my-popup-class'})
        .setLngLat(marker.geometry.coordinates)
        .setHTML('<div><h1  id="id_' + thecountry + '" class="dp_color_' + thecountry + '" style="font-size:' + fontsize + 'px;">' + capcountry + '<span>' + marker.properties.number + '</span></h1></div>')
        .addTo(map);
    })
  }

  componentWillUnmount() {
    map.remove();
  }
  
  render() {
    // let {countries} = this.props;
    // console.log("countries");
    // console.log(countries);

    return (
      <React.Fragment>
        <h1 className="dichtbij">{today()} <span id="dichtbij">en van zo dichtbij mogelijk</span></h1>
        <div id="products-nl" />
        <div ref={el => this.mapContainer = el} className="absolute top right left bottom"/>
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


export default connect(mapStateToProps)(Mapbox)