import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "../common/form";
// import auth from "../services/authService";

export default class LoginForm extends Form {
  constructor(props, context) {
    super(props, context);
    this.state = { 
      data: { email: ""},
      errors: {}
    };
  }
 
  schema = {
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2 })
      .label("Email")
  };

  doSubmit =  () => {
    const { data } = this.state;
      this.props.history.push('/');
    if (ex.response && ex.response.status === 400) {
      const errors = { ...this.state.errors };
      errors.username = ex.response.data;
      this.setState({ errors });
    }
  };


  render() {

    return (
      <div 
        id="checkoutBox"
        className="login-box"
      >       
        <div className="login-box__inner">
            <h4>Nieuw bij Versman?</h4>
            <p>
              Stuur ons eerst je e-mailadres. <br/> 
              We sturen direct een email terug, zodat we zeker weten dat jij de eigenaar bent... <br/>
              Als je dat bevestigt kan je de inschrijving voltooien.
            </p>
          <form className="login-form" onSubmit={this.handleSubmit}>
            {this.renderInput("email", "E-mailadres")}
            {this.renderButton("Inschrijven")}
          </form>
        </div>          
        </div>

    );
  }
}

