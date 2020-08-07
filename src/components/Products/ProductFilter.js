import  React, { Component } from 'react';
// import product from "../../../public/js/assortiment_all.json"
import { connect } from 'react-redux';

export class ProductFilter extends Component {
  constructor(props) {
  	super(props);
  	this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (category) => {
  	this.props.onChange(category);
  }

  render() {

  const { products } = this.props;

  const categoryArray = ['All products'];
  products.map(hit => {
			const x = hit.category.name;
			if(categoryArray.indexOf(x) === -1)
			categoryArray.push(x);        
			return null;
		}
  )
  const categoryArraySorted = categoryArray.sort();
  console.log(categoryArraySorted);

  return (
	<div className="producten-filter">
	{
		categoryArraySorted.map(category => {
			const collectProducts = [];
			products.map( p => { p.category.name === category ? collectProducts.push(p.title) : null })			
			return (
				<p 
					className={"category-color " + category}
					key={category}
					onClick= {() => this.handleChange(category)}
				>
				{category}
				<span> { category !== "All products" ? collectProducts.length : null }</span>
				</p>					
		)})
	}
	</div> 
    )
  }
}

function mapStateToProps(state) {   // maps products from redux store on to our props
	return {
		products: state.products,
	}
}

export default connect(mapStateToProps)(ProductFilter)