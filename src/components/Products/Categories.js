import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export function Categories (props) {

	const categoryArray = [];
    props.products.map(hit => {
        const x = hit.category.name;
        if(categoryArray.indexOf(x) === -1)
        categoryArray.push(x);        
        return null;
      }
    )
    const categoryArraySorted = categoryArray.sort();
	// console.log(categoryArraySorted);
	
    return (
    	<React.Fragment>
        {/* <div>
            <h1>Category</h1>
        </div>		 */}
        <div className="producten-filter">
		{
			categoryArraySorted.map(category => {
			const collectProducts = [];
			props.products.map( p => { p.category.name === category ? collectProducts.push(p.title) : null })			
			return (
				<Link key={category} to={'/sorts/' + category}>
				<p 
					className={"category-color " + category}
				>
				{category}
				<span> { category !== "All products" ? collectProducts.length : null }</span>
				</p>		                  
				</Link>                
			)})
		}
		</div> 
        </React.Fragment>
    )
}

function mapStateToProps(state) {   // maps products from redux store on to our props
	return {
		products: state.products,
		thesorts: state.thesorts,
		thecategories: state.thecategories,
	}
}

export default connect(mapStateToProps)(Categories)