import React, { Component } from 'react'
import Like from "../common/like";

export default class Test extends Component {
    state = {
        count: 0,
        tags: ["tag1", "tag2", "tag3"],
        data: '',
        products: [
            {
                title: "Appels",
                count: 1
            },
            {
                title: "Peren",
                count: 4
            },
            {
                title: "Pruimen",
                count: 2
            }
        ]
    }

    handleIncrement = () => {
        const { count } = this.state;
        this.setState({ count: count + 1 });
    }

    handleProducts = (product) => {
        const { count } = this.state;
        this.setState({ count: count + 1 });
    }

    handleChange = (e) => {
        e.preventDefault();
        const data = this.state.data;
        this.setState({data: e.target.value});
        console.log(data);
    }

    handleClick = (e) => {
        console.log(e);
    }

    handlePlus = (e) => {
        console.log(e);
        const products = [...this.state.products];
        const index = products.indexOf(e);
        products[index] = { ...products[index] };
        products[index].count = products[index].count + 1;
        this.setState({ products });
        console.log(products);
    }

    handleDelete = e => {
        const movies = this.state.movies.filter(m => m._id !== e._id);
        this.setState({ movies });
    }

 
    render() {

        console.log(this.state.movies);

        return (
            <React.Fragment>

                <div className="container login-box__inner">
                    { this.state.count === 0 && <p>Er zijn geen tags</p> }   {/* // true && 'Hi' && 1  => 1 */}
                    <span className={"badge m-2 badge-" + (this.state.count === 0 ? 'warning' : 'primary')}>{this.state.count}</span>
                    <ul>
                        { this.state.tags.map((hit, id) => {
                            return (
                                <li key={id}>{hit}</li>
                            )
                        })}                    
                    </ul>

                    <button className="btn btn-secondary btn-small" onClick={this.handleIncrement}>button</button>
                    <br/><br/>
                        
                    <form className="login-form"  onSubmit={this.handleSubmit}>
                        <label className="input-label">Name:</label>
                        <input className="input-field" type="text" value={this.state.data} onChange={this.handleChange}/>
                        <button className="button-login btn btn-primary">button</button>
                    </form>
                    <br/><br/>

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.products.map( (hit, id) => {
                                return (
                                <tr key={id}>
                                    <th>{id}</th>
                                    <td onClick={() => this.handleClick(hit.title)}>{hit.title}</td>
                                    <td onClick={() => this.handlePlus(hit)}>{hit.count}</td>                                         
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>                
            </React.Fragment>

        )
    }
}
