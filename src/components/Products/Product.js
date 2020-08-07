import  React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import recept from "../common/data/recipes.json";
import { capitalize, afgerond, slugify, lowercase } from '../common/common';
import AssortimentItems from '../Assortiment/AssortimentItems'
import Categories from './Categories';

console.log("Product work!");

export function Product (props) {

	console.log("Product");

    const prod = props.thesorts.find(({ name }) => slugify(name) === props.match.params.url);

    const sortSlugify = slugify(prod.name);
	const activeLocation = "100% bio";
	const sort = prod.name;
	
  return (
	<React.Fragment>

	<Categories />

	<div className="container">

	<div className="producten flex">
		<div className="product-lead_img">
			<img src={'/public/img/products/product_' + sortSlugify + '.jpg'} alt={prod.name}/>
		</div>
		<div className="product-lead_text">
			<h1 className={sortSlugify}>{prod.name} <span>{prod.name_english}</span> </h1>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit soluta voluptas aperiam maiores nisi natus, quia eos corrupti temporibus iusto modi sapiente, nostrum necessitatibus saepe ullam, enim sit distinctio doloremque.</p>
			<p><strong>Engelse vertaling dolor sit amet, consectetur adipisicing elit. Suscipit soluta voluptas aperiam maiores nisi natus, quia eos corrupti temporibus iusto modi sapiente, nostrum necessitatibus saepe ullam, enim sit distinctio doloremque.</strong></p>
		</div>
	</div>

	<div className="grid pro-box">
		<div className="pro-box-recepten">
			<h5 id="output">recepten</h5>    
			<div className={"bg_ recipes-box"}>
				{recept.map( (r, index) => {
					let detitel = slugify(r.title);
					let theproduct = lowercase(prod.name);
					if(r.tags.includes(theproduct))
					return (
						<p className="recipe" key={index}>
							<Link to={"/recepten/" + detitel }>
								{ r.title } 
								{/* &nbsp;&nbsp;<span>1 kg </span>&nbsp;<span className="personen">4</span> */}
								{/* <img src="/assets/img/icons/personen.svg" alt=""/> */}
							</Link>
						</p>                                       
					)
				})}				
		</div>  
	</div>
	<div className="pro-box-items">
		<AssortimentItems 
			activeLocation= {activeLocation}
			usort= {sort}
		/>
	</div>
	</div>


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

export default connect(mapStateToProps)(Product)