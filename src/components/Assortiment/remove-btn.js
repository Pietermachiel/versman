import React from 'react'

export default function RemoveButton(props) {
  return (
    <React.Fragment>
      <button
      className="btn-minus"
      onClick={() => props.removeFromCart(props.cartItem)}
      >-</button>      
      <span>{
        (props.cartItem && props.cartItem.quantity) || 0
      }</span> 
    </React.Fragment>
  )

}