import React, { Component } from "react";
import Table from "../common/table";
import Like from "../common/like";

class RecipesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "body", label: "Body" },
    {
      key: "delete",
      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { posts, onDelete, onUpdate } = this.props;

    return (
        <React.Fragment>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    { posts.map( (hit, id) => {
                        return (
                        <tr key={id}>
                            <th>{id}</th>
                            <td onClick={() => this.handleClick(hit.title)}>{hit.title}</td>
                            {/* <td onClick={() => this.handlePlus(hit)}>{hit.count}</td>      */}
                            <td>
                                <button
                                onClick={() => onDelete(hit)}
                                className="btn btn-danger btn-sm"
                                >
                                Delete
                                </button>                             
                            </td>
                            <td>
                                <button
                                onClick={() => onUpdate(hit)}
                                className="btn btn-default btn-sm"
                                >
                                Update
                                </button>                                   
                            </td>
                                   
                                 
                        </tr>
                        )
                    })}
                </tbody>
            </table>            
        </React.Fragment>

    );
  }
}

export default RecipesTable;
