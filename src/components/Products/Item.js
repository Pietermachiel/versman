import React, { Component } from "react";
import assortiment from "../../../public/js/assortiment_all.json";
import { capitalize, afgerond, slugify, uppercase, lowercase } from '../common/common';

// console.log("Item works!");

const assortix = assortiment.map( el => {
    var o = Object.assign({}, el);
    o.showMe = false;
    return o;
});
// console.log(assortix);

export default class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            assorti: [],
        }
    }

    componentDidMount() {
        this.setState({ assorti: assortix });
    }


    
    handlePlus = item => {     
        var assorti = [...this.state.assorti];
        const index = assorti.indexOf(item);
        assorti[index] = { ...assorti[index] };
        this.state.assorti[index].count === 0 ? assorti[index].showMe = !assorti[index].showMe : null;
        assorti[index].count = assorti[index].count + 1;
        this.setState({ assorti });
    };

    handleMinus = item => {
        const assorti = [...this.state.assorti];
        const index = assorti.indexOf(item);
        assorti[index] = { ...assorti[index] };
        this.state.assorti[index].count === 1 ? assorti[index].showMe = !assorti[index].showMe : null;
        assorti[index].count = assorti[index].count - 1;
        this.setState({ assorti});
    };
  
    render() {
        const theassorti = this.state.assorti;
        // console.log(theassorti);
        let desoort = this.props.thesort;
        let location = slugify(this.props.activeLocation);
        // console.log("location: " + location);
        return (
            <React.Fragment>
                {theassorti.map( (item, id) => {
                    // let delocatie = slugify(item.location);
                    let theprice = afgerond(item.price);
                    let hetland = slugify(item.location);
                    let capcountry = uppercase(item.country);                   
                    if (!location && hetland !== location && location !== '100%-bio' ) return null;
                    if ( item.sale === true )                   
                    if ( item.sort === desoort )
                    return (
                        <div key={id} className={"bestellen-box bg_" + hetland }>
                        <p className={"title colord_" + hetland }>{item.title}</p>
                        <p className="unit grijs-40">{item.unit}</p>
                        <p className={"country colord_" + hetland }>{capcountry}</p>
                        <p className="price black">{theprice}</p>
                        <div className="bestellen-input">
                            { item.showMe ? <React.Fragment><button onClick={() => this.handleMinus(item)} className="btn-minus">-</button><span>{item.count}</span></React.Fragment> : null }                
                            <button onClick={() => this.handlePlus(item)} className={"btn-plus bg100_" + hetland }>+</button>
                            </div>                                   
                        </div>
                    )
                })}                            
            </React.Fragment>
        );
    }
};
