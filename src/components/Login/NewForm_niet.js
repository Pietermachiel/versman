import React from "react";
import { withRouter } from 'react-router-dom';
import Joi from "joi-browser";
import Form from "../common/form";
// import auth from "../services/authService";

class NewForm extends Form {
  constructor(props, context) {
    super(props, context);
    this.state = { 
      data: { postcode: "" },
      errors: {}
    };
  }
 
  schema = {
    postcode: Joi.string()
      .required()
      .label("Postcode")
      .regex(/25[0-8][0-9]|259[0-9]/g)
      // .regex(/^(?:NL-)?(\d{4})\s*([A-Z]{2})$/i),
  };

  doSubmit = () => {
    let { history } = this.props;
    history.push({ pathname: '/signup' });
  }

  render() {

    const error = this.state.errors["postcode"];
    console.log(error);

    return (
      <div 
        id="checkoutBox"
        className="login-box"
      >       
        <div className="login-box__inner">
          <h4>Nieuw bij Versman?</h4>
          <p>Controleer eerst of we op jouw adres bezorgen.</p>
          <form className="login-form" onSubmit={this.doSubmit}>
              {/* {this.renderInput("postcode", "Postcode")} */}
              {error && <div className="alert alert-danger">{error}</div>}        
              <div className="postcode">
                <label className="input-label" htmlFor="postcode">Postcode</label>
                <input className="input-field" onChange={this.handleChange} name="postcode" id="postcode" />
                <button className="button-login btn btn-primary"> {/* disabled={this.validate()} */}
                  Check
                </button>                  
              </div>
              {/* {this.renderButton("Ga verder")} */}
          
          </form>
        </div>          
        </div>

    );
  }
}

export default withRouter(NewForm);