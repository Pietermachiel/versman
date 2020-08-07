import React from 'react';
import { Link } from 'react-router-dom'
import recept from "../common/data/recipes.json"
import groenten from "../../../public/js/assortiment_all.json";


export default function Recept ({ match }) {

  const recipe = recept.find(({ url }) => 
    url === match.params.url);

  function slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-'); 
  }

  const productImg = slugify(recipe.product);

  const uniqueProducts = [];
  const theproduct = ["groente1"];
  groenten.map(groente => {theproduct.push(groente.product)});
  theproduct.forEach(prod => {
    if(uniqueProducts.indexOf(prod) === -1) {
      uniqueProducts.push(prod)
    }
  })
  const uniqueProductsSort = uniqueProducts.sort();

  return (
    <React.Fragment>

      <div className="about">
        <h1>{recipe.title}</h1>
      </div>

      <div className="recepten-container">
        <div className="recepten-box flex">


          <div className="ingredienten-box">
            <div className="ingredienten-box-inner">
              {recipe.fresh.length > 0 ? <p>vers</p> : null }
                <div className="recepten-items">
                  {recipe.fresh.map((hit, id) => {
                    let hetitem = hit.item;
                    return (
                    <div key={id}>
                    {uniqueProductsSort.includes(hetitem) ? 
                      <li>
                        <input type="checkbox" defaultChecked id="ossm" name="ossm"/>
                        &nbsp;&thinsp;{hit.item} {hit.quantity} {hit.unit}
                      </li>                        
                    :
                      <li>
                          {hit.item} {hit.quantity} {hit.unit}
                      </li>
                    }                    
                    </div>  
                    )
                  })}
               </div>                  
                <p>voorraad</p>
                <div className="recepten-items">
                {recipe.stock.map((hit, id) => {
                    return (
                      <li key={id} >
                          {hit.item} {hit.quantity} {hit.unit}
                      </li>
                    )
                  })}
                </div>
                {recipe.basic.length > 0 ? <p>basics</p> : null }
                <div className="recepten-items">
                {recipe.basic.map((b, id) => {
                  const slugb = slugify(b);
                  return (
                    <Link key={id} to={"/recepten/" + slugb }>
                      <li>{b}</li>
                    </Link>
                  )
                })}
                </div>
                <div className="zetopmijnlijst">
                  <button className="btn-zetopmijnlijst bg100_nederland">+ zet op mijn lijst</button>
                </div>
            </div>
          </div>

          <div className="recepten-box-onder">
            <div className="recepten-box-onder__inner">
              <p className="receptvoor">
                <span className="dish">{recipe.dish} </span>
                &nbsp;recept voor&nbsp;
                <span className="personen">{recipe.serve}</span>
              </p>			
              <div className="recipe-contents">
                <div className="directions">
                  <ol>
                  {recipe.directions.map((hit, id) => {
                    return (
                    <li key={id} >{hit}</li>                      
                    )
                  })}
                  </ol>
                </div>
              </div>
              <div className="recepten-sub">
                <div className="recepten-image">
                    <img src={`/public/img/products/product_${productImg}.jpg`} alt=""/>
                </div>
                <div className="recepten-citaat">
                  <h5>{recipe.product}</h5>
                  <p>{recipe.info}</p>
                </div>
              </div>
              <br/>
              <div className="recepten-tags">
                {recipe.book.map((hit, id) => {
                  return (
                  <a key={id}  href={hit.source_url} target="_blank">
                    <span >– {hit.author}, <strong>{hit.title}</strong> {hit.publisher}, {hit.year}.</span>
                  </a>                                         
                  )
                })}
              </div>
              {recipe.sub.length > 0 ? <p><strong>gerelateerd</strong></p> : null }
              {recipe.sub.map((sub, id) => {
                const slugsub = slugify(sub)
                return (
                  <Link to={"/recepten/" + slugsub}><p>{sub}</p></Link>                  
                )
              })}

            </div>
          </div>	
        </div>
      </div>
    </React.Fragment>
    )
}
