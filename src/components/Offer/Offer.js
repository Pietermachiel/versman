import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
// import posters from '../../../public/js/assortiment_all.json';
import { slugify, afgerond, today, theweek } from '../common/common';

export class Offer extends Component {

    render() {

    const { products, thesorts } = this.props;
    // console.log("offer: products");
    // console.log(products);

    const theoffer = products.find(product => product.sale === true);
    console.log(theoffer);

    var saleProducts = {
        prods: [],
        howmany: 0
    };
    products.forEach(cat => {
       const count = parseInt(cat);
       if (cat.offer === true)
        saleProducts.prods.push(cat);
        saleProducts.howmany += isNaN(count) ? 1 : 0;
    });
    console.log(saleProducts);

    const thecountries = [];
    products.map(cat => {
       thecountries.indexOf(cat.country.name) === -1 ? thecountries.push(cat.country.name) : null;
    });
    // console.log("offer: thecountries");
    // console.log(thecountries);

    return(
        <React.Fragment>
                {/* <div className="page-chapeau">De aanbiedingen van week {theweek()}</div> */}
                <h1 className="offer-week">Week {theweek()}</h1>

                <div className="poster-box flex">
                    {products.map((poster, id) => {
                    let countrycolor = slugify(poster.country.name);
                    let productcolor = slugify(poster.sort.name);
                    let theprice = afgerond(poster.price);
                    let theprice2 = afgerond(poster.price2);
                    if (poster.offer === true)
                    return (
                        <div key={id}  className={"posters poster_" + productcolor }>
                        <Link to={`/products/${poster.sort.name}`}>
                            <p className="title">{ poster.title }</p>
                            <p className="text">{ poster.text }</p>
                            <p className="eng">
                            
                            { thesorts.map(s => s.name === poster.sort.name ? s.name_english : null )}
                            
                            </p>
                            <p className="unit ">{ poster.unit }</p>
                            <p className="price ">{ theprice }</p>
                            <p className="unit2 ">{ poster.unit2 ? poster.unit2 : null }</p>
                            <p className="price2 ">{ poster.price2 ? theprice2 : null }</p>
                            <p className={"color_" + countrycolor + " country" }>{ poster.country.name }</p>
                            { poster.country.name !== "Direct van de boer" ? <img src="/public/img/icons/versman-poster.svg" alt="" /> : null }
                            {/* <p className="lekker">Lekker en gezond begint bij goede grond</p> */}
                        </Link>	                            
                            
                        </div>
                    )
                    })
                    }
                </div>
        </React.Fragment>
    )
    }
}

function mapStateToProps(state) {   // maps products from redux store on to our props
    return {
      // cart: state.cart,
      products: state.products,
      thesorts: state.thesorts,
    }
  }
  
  
  export default connect(mapStateToProps)(Offer)