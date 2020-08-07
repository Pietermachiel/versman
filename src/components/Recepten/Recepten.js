import  React, { Component } from 'react';
import recept from "../common/data/recipes.json";
import { Link } from 'react-router-dom';
import { ReceptenFilter} from './ReceptenFilter';

export default class Recepten extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCategory: 'recepten'
    };
  }

  handleChange = (category) => {
    this.setState({ activeCategory: category });
  }

  render() {

  const { activeCategory } = this.state;

  const uniqueProducts = [];
  recept.forEach(prod => {
      if (prod.dish !== activeCategory && activeCategory !== 'recepten' ) return null
    
      const groenten = [];
      prod.tags.map(tag => {groenten.push(tag); console.log(tag);} );

      groenten.forEach(prod => {
        if (uniqueProducts.indexOf(prod) === -1) {
            uniqueProducts.push(prod)
        }
      })
  });
  console.log(uniqueProducts);

  const uniqueProductsSort = uniqueProducts.sort();

  let dish = this.state.activeCategory;
  return (
  

  <React.Fragment>
    {/* <div className="about">
        <h1>Recepten <span className={"recepten-dish " + dish}>{ dish === "recepten" ? null : dish }</span></h1>
    </div> */}
    <ReceptenFilter 
      onChange={this.handleChange}
    />

    <div className="menu-box menu-box__rose">
      <div className="menu-box__inner">
    
      {uniqueProductsSort.map((product, index) => {
        String.prototype.capitalize = function() {
            return this.charAt(0).toUpperCase() + this.slice(1);
        };
        var productC = product.capitalize();
        return (
        <div key={index} className="menu-box__item">

        <h6 className="menu-box__prod" id={product}>
          {product}
        </h6>
        <Link to={'/producten/' + product}>
          <h5 className="menu-box__product">
            {productC}
          </h5>
        </Link>

        {recept.map((hit, id) => {
          let unique = hit.tags;
          if( !unique.includes(product) ) {
            return null
          }
          if ( hit.dish === activeCategory || 'recepten' === activeCategory )
            return (
              <h5 key={id} className="menu-box__title">
              <Link className={"menu-box__link " + product } id={hit.url} to={`/recepten/${hit.url}`}>
              {hit.title}
              </Link>
              </h5>
            )
          })
        }
        </div>
        )
       }

      )}

      </div>
    </div>
    </React.Fragment>
    );
  }
}


