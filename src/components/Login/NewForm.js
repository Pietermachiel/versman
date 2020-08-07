import React from "react"
import { withRouter } from "react-router-dom";

class TestForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { 
      // initialize data and errors
      data: {
          postcode: ""
      },
      errors: {}
    };
  }

  validate = () => {
    const { data } = this.state;

    const errors = {};
    var regex = /^(?:NL-)?(\d{4})\s*([A-Z]{2})$/i;
    const geldigepostcode = regex.test(data.postcode);
    console.log(geldigepostcode);

    function stripnumbers(text) {
        return text.toString().toLowerCase()
        .replace(/\D/g, '');
    }     
    const dhaag = [ 2490, 2491, 2492, 2493, 2495, 2496, 2497, 2498, 2500, 2501, 2502, 2503, 2504, 2505, 2506, 2507, 2508, 2509, 2511, 2512, 2513, 2514, 2515, 2516, 2517, 2518, 2521, 2522, 2523, 2524, 2525, 2526, 2531, 2532, 2533, 2541, 2542, 2543, 2544, 2545, 2546, 2547, 2548, 2551, 2552, 2553, 2554, 2555, 2561, 2562, 2563, 2564, 2565, 2566, 2571, 2572, 2573, 2574, 2581, 2582, 2583, 2584, 2585, 2586, 2587, 2591, 2592, 2593, 2594, 2595, 2596, 2597 ];
    const denhaag = dhaag.toString();
    const stripped = stripnumbers(data.postcode).toString();
    console.log(stripped);
      
    // if (data.postcode.trim() === '')
    //   errors.postcode = "postcode is required";
      
    if (!denhaag.includes(stripped))
      errors.postcode = "Helaas, nog niet";
    
    if (!regex.test(data.postcode))
      errors.postcode = "Vul een geldige postcode in";

    // returns an array of errors
    return Object.keys(errors).length === 0 ? null : errors;

    //   return { postcode: "postcode is required"};
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);

    this.setState({ errors: errors || {} });  // mag niet 0 worden!
    if (errors) return;
    // call the server
    console.log("handled");
    this.doSubmit();
  }

  doSubmit = () => {
    let { history } = this.props;
    history.push({ pathname: '/signup' });
  }

  onChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data};
    // data.postcode = e.currentTarget.value;
    data[input.name] = input.value;
    this.setState({ data });
  }

  render() {

    const data = this.state;
    const error = this.state.errors.postcode;
    console.log(this.state);

    return (
      <div 
        id="checkoutBox"
        className="login-box"
      >       
        <div className="login-box__inner">
          <h4>Testform</h4>
          <p>Controleer eerst of we op jouw adres bezorgen.</p>
          {error && <div className="alert alert-danger">{error}</div>}
          <form className="login-form" onSubmit={this.handleSubmit}>
            <React.Fragment>
                <div className="postcode">
                    <label className="input-label" htmlFor="postcode">Postcode</label>
                    {/* <input className="input-field" name="postcode" id="postcode"/> */}
                    <input 
                        className="input-field" 
                        // style={{ width: '70%' }}
                        type='text' 
                        // value={this.state.data.postcode}
                        value={data.postcode}
                        // onChange={e => this.setState({ data: {postcode: event.target.value} })}
                        onChange={this.onChange}
                        name='postcode' 
                        placeholder='hier je postcode...' 
                        error={error}
                    />
                    <button className="button-login btn btn-primary">  {/* disabled={this.validate()}    style={{ width: '30%', marginTop: 0 }}*/}
                    Check
                    </button>                    
                </div>


            </React.Fragment>


          </form>
        </div>          
        </div>

    );
  }
}

export default withRouter(TestForm);