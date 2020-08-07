import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import FromLocation from './FromLocation';
import { capitalize, afgerond, slugify, uppercase, lowercase, today, theweek } from '../common/common';
import AssortimentItems from '../Assortiment/AssortimentItems';


export class Assortiment extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      country: '100% bio',
      showMe: false,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  // opens the 'sort' menu
  handleClick = (thetitle) => {
    this.setState({ title: thetitle });
    // console.log(this.state.title);
  }

  // changes 'from' country state
  handleChange = (item) => {
      this.setState({ country: item });
      // console.log(this.state.country);
  }
  
  render() {
  const { thesorts, products } = this.props
  // console.log("homepage-products")
  // console.log(products)
  // console.log("homepage-thesorts")
  // console.log(thesorts)

  const locations = ["100% bio", "Nederland", "Europa", "Wereld"];
  const { country: activeLocation } = this.state;
  // console.log(activeLocation);

  var category = [];
  products.map(cat => {
    // console.log(cat.location);
      if (cat.location !== activeLocation && activeLocation !== '100% bio' ) return null
          category.push(cat.category.name);
  });
  // console.log(category);
  var uniqueCategory = category.filter((v, i, a) => a.indexOf(v) === i);
  // console.log(uniqueCategory);
  uniqueCategory = uniqueCategory.sort();
  // console.log(uniqueCategory);
  // console.log(this.props);

  return (
  <React.Fragment>
    {/* <h1 className="page-title_giddyup">Shop</h1> */}
    <div className="container">

      <FromLocation onChange={ this.handleChange }/>

      <div id="grid">
        {uniqueCategory.map( (cat, id) => {
          const uniqueSort = [];
          products.map(prod => {
          // console.log(prod.category.name);
            if (prod.location !== activeLocation && activeLocation !== '100% bio' ) return null

            if ( cat === prod.category.name ) {
                uniqueSort.indexOf(prod.sort.name) === -1 ? uniqueSort.push(prod.sort.name) : null;
            }
          });


          return (
            <React.Fragment key={id}>
            <div className="category-box">
            <h2 id="categories">{cat}<Link className="grijs-40" to={`/sorts/${cat}`}>Info</Link></h2>
              <ul className="list-items">
                {uniqueSort.map( (usort, id) => {
                  let thetitle = slugify(usort);
                  let t = this.state.title;
                  // console.log(usort);
                  const thelocation = [];    
                  // console.log(thelocation);            
                  return (
                    <li 
                    key={id}
                    className={"hover" + ( t === thetitle ? " show-border" : null )} 
                    id={thetitle}
                    onClick={() => this.handleClick(thetitle)}                        
                    >    
                    <a className="data-tip" data-tip={ thetitle } data-toggle="collapse" href={"#index" + thetitle } aria-expanded="false" aria-controls={"index_" + id }>
                        <h4 className="brand-color">
                          {usort}  

                          {/* push to const thelocation = [] */}
                          {locations.map((hit) => {
                              //  console.log(hit); 
                              //  console.log(activeLocation); 
                               if (hit !== activeLocation && activeLocation !== '100% bio' ) return null;
                              {products.map((hits) => {
                                // console.log(usort); 

                                  if (hits.sale === true)
                                  if (usort === hits.sort.name) 
                                  if ( hits.location === hit) {
                                      const y = {
                                          "id": id,
                                          "location": hits.location
                                      }
                                      thelocation.push(y);                    
                                  } 
                                  })} 
                              //  console.log(thelocation); 
                          })}

                          {/* bolletjes = thelocation.map */}
                          {thelocation.map((item, ids) => {
                              let hetland = slugify(item.location);
                              return ( 
                              <button key={ids} className={"btn-product bg100_" + hetland }></button> 
                              )                             
                          })}

                        </h4>     
                    </a>     
                    <div className="specs-box collapse" id={"index" + thetitle }>
                     <AssortimentItems 
                          activeLocation= {activeLocation}
                          usort= {usort}
                     />
                    </div>
                    </li>   
                  )  
                })}
              </ul>               
            </div>       
            </React.Fragment>

          )
        })}

      </div>
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


export default connect(mapStateToProps)(Assortiment)