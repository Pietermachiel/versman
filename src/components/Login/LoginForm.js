import React from "react";
import { NavLink, withRouter } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "../common/form";
// import auth from "../services/authService";

export default class LoginForm extends Form {
  constructor(props, context) {
    super(props, context);
    this.state = { 
      data: { email: "", password: "" },
      errors: {}
    };
  }
 
  schema = {
    email: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit =  () => {
    const { data } = this.state;
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
          <h4>Login bij Versman</h4>
          <p>Vul je gegevens in.</p>
          <form className="login-form" onSubmit={this.handleSubmit}>
            {this.renderInput("email", "E-mailadres")}
            {this.renderInput("password", "Wachtwoord", "password")}  {/* // name,label, type = options */}
            {this.renderButton("Inloggen")}
          </form>
          <br/>
          <p className="link-inschrijven">Nieuw bij Versman? &nbsp;
            <NavLink to="/new">
              <span>Inschrijven ></span>
            </NavLink>
          </p>
        </div>                   
      </div>
    );
  }
}

