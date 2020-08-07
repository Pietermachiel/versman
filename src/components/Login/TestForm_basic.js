import React from "react"
import Joi from "joi-browser";
import Form from "../common/form";

export default class TestForm extends Form {
  constructor(props, context) {
    super(props, context);
    this.state = { 
      // initialize data and errors
      data: {
        username: "",
        password: ""
      },
      errors: {}
    };
  }

  validate = () => {
    const errors = {};

    const { data } = this.state;
    if (data.username.trim() === '')
      errors.username = "Username is required.";
    if (data.password.trim() === '')
      errors.password = "Password is required.";
      
    return Object.keys(errors).length === 0 ? null : errors;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);

    this.setState({ errors: errors || {} });
    if (errors) return;

    console.log("Submitted");
  }

  validateProperty = ({name, value}) => {                     // input = { name, value }
    if (name === 'username') {                                // input.name = name
      if (value.trim() === '') return 'Username is required'; // input.value = value
    }
    if (name === 'password') {
      if (value.trim() === '') return 'Password is required';
    }
  }

  handleChange = ({ currentTarget: input }) => {
    const errors = {...this.state.errors};
    const errorMessage = this.validateProperty(input)
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data};
    data[input.name] = input.value;

    this.setState({ data, errors });
  }

  // handleChange = ({ currentTarget: input }) => {
  //   const data = { ...this.state.data};
  //   data[input.name] = input.value;
  //   this.setState({ data });
  // }

  render() {

    const data = this.state;
    console.log(this.state);

    const errors = this.state.errors;

    return (
      <div 
        id="checkoutBox"
        className="login-box"
      >       
        <div className="login-box__inner">
          <h4>Testform</h4>
          <p>Vul je gegevens in.</p>
          <form className="login-form" onSubmit={this.handleSubmit}>
            <div className="form-group email">
              { errors.username && <div className="alert alert-danger">{errors.username}</div>}
              <label className="input-label" htmlFor="username">Username</label>
              <input className="input-field" value={data.username} onChange={this.handleChange} id="username" name="username" type="text" />
          </div>
            <div className="form-group password">
              { errors.password && <div className="alert alert-danger">{errors.password}</div>}
              <label className="input-label"  htmlFor="password">Password</label>
              <input className="input-field"  value={data.password} onChange={this.handleChange} id="password" name="password" type="text" />
            </div>
            <button className="button-login btn btn-primary"> {/* disabled={this.validate()} */}
              Check
            </button>   
          </form>
        </div>          
        </div>

    );
  }
}

