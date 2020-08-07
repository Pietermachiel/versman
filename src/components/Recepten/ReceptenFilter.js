import  React, { Component } from 'react';
import recept from "../common/data/recipes.json"

export class ReceptenFilter extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (category) => {
    this.props.onChange(category);
  }

  render() {

  const receptenArray = ['recepten'];

  recept.map(hit => {
    const x = hit.dish;
    if (receptenArray.indexOf(x) === -1)
      receptenArray.push(x);
  });

  return (
    <React.Fragment>
    <div className="recepten-filter__box">
      <div className="recepten-filter recepten_gradient">
          {
            receptenArray.map(category =>
                <span 
                    className={category}
                    key={category}
                    onClick={() => this.handleChange(category)}
                >
                  {category}
                </span>
            )
          }
      </div>    
    </div>

    </React.Fragment>
    );
  }
}


