import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { capitalize, afgerond, slugify, uppercase, lowercase, today, theweek } from '../common/common';
import Categories from './Categories';

// console.log("Products work!");

class Sorts extends React.Component {

  render() {
    const { addToCart, removeFromCart, products, thesorts, cart, match } = this.props
   
    const uniqueSort = [];
    products.forEach(prod => {
      uniqueSort.indexOf(prod.sort.name) === -1 ? uniqueSort.push(prod.sort.name) : null;
    });

      return (
        <React.Fragment>

          <Categories />     

          <div className="container">

            <div className="pr-box">
              <div className="pr-box-right">
                <p>sorts</p>
                <div className="pr-box-right__flex">
                {uniqueSort.map((hitsort, id) => {
                  return (
                  <React.Fragment key={id} >
                  {thesorts.map((hit, index) => {
                    const uniqueUrl = slugify(hit.name);
                    let sortLowercase = slugify(hit.name);
                    if (hit.name !== hitsort ) return null;
                    if (hit.select === true) return null;
                    return (
                    <div key={index} className="pr-box-right__outer" producten-filter={hit.category.name}>
                    <img src={'/public/img/products/product_' + sortLowercase + '.jpg'} alt={hit.name}/>
                    <Link to={'/products/' + uniqueUrl}>
                      <h4 className={sortLowercase}>{hit.name}</h4>
                    </Link>
                  </div>
                  )
                  }) 
                  }					
                  </React.Fragment>
                  )
                })}
                </div>
              </div>

              <div className="pr-box-left">
                <div className="pr-box-left__flex">

                {uniqueSort.map((hitsort, id) => {
                  return (
                    <React.Fragment key={id} >
                      {thesorts.map((hit, i) => {
                      const uniqueUrl = slugify(hit.name);
                      let sortLowercase = slugify(hit.name);
                      if (hit.name !== hitsort ) return null;
                      if (hit.select !== true) return null;
                      return (
                          <div key={i} className="pr-box-left__outer" producten-filter={hit.category.name}>
                            <Link to={'/products/' + uniqueUrl }>
                              <div className="pr-box-left__top">
                                <div className="pr-box-left__img">
                                <img src={'/public/img/products/product_' + sortLowercase + '.jpg'} alt={hit.name}/>
                                <h4 className={hit.color}>{hit.name}</h4>
                                </div>
                              </div>
                            </Link>
                            <div className="pr-box-left__bottom">
                              <p>selection week {theweek()}</p>
                              <h4 className={sortLowercase}>
                              {hit.name} 
                              </h4>
                              <p className="">
                              {hit.text}
                              </p>
                            </div>
                          </div>
                        )
                        })
                        }
                      </React.Fragment>
                      )
                    })
                  }
              </div>
              
              </div>

              </div> 

          </div>          
        </React.Fragment>

      )
  }
}


function mapStateToProps(state) {   // maps products from redux store on to our props
    return {
      thesorts: state.thesorts,
      products: state.products,
    }
  }

export default connect(mapStateToProps)(Sorts) // , mapDispatchToProps