import React, { Component } from 'react';

export default class LightSwitch extends Component {
  
    state = {
      isSwitchOn: false,
    }
    
    render() {
      console.log(this.state.isSwitchOn);
      return (
        <div>
          <div className="col-sm-4 col-sm-offset-4">
            <div
              className={ this.state.isSwitchOn ? "square switch-on" : "square switch-off" }
              onClick={() => this.setState({isSwitchOn: !this.state.isSwitchOn})}>
              { this.state.isSwitchOn ? 'on' : 'off' }
            </div>
          </div>
          <div className={ this.state.isSwitchOn? "bg-light light-on": "bg-light light-off" } />
        </div>
      );
    }
  }
      