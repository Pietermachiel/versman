import React, { Component } from "react";

export class Panel extends React.Component {

  constructor(props) {
    super(props)
    this.state = { isOpen: false }
  }

  handleOpen = () => {
    this.setState({ isOpen: true })
  }

  handleClose = () => {
     this.setState({ isOpen: false })
  }

  render() {
    return (
       <div className="mousehover">
        <button
          onMouseEnter = { this.handleOpen }
          onMouseLeave = { this.handleClose }
          open={ this.state.isOpen }
          id="button-switch"
        >
          <h1>Only one Item</h1>
        </button>
      </div>
    )
  }
}