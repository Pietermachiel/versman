import React from 'react'
import { capitalize, afgerond, slugify, uppercase, lowercase } from '../common/common';

export default function AddButton(props) {
  let hetland = slugify(props.product.location);
  return (
    <React.Fragment>
      <button
      className={"btn-plus bg100_" + hetland }
      onClick={() => props.addToCart(props.product)}
      >+</button>     
    </React.Fragment>
  )

}