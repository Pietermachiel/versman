import React, { Component } from "react";
import Table from "../common/table";
import Like from "../common/like";

class RecipesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "category.name", label: "Category" },
    { path: "author", label: "Auteur" },
    { path: "dish", label: "Dish" },
    {
      key: "like",
      content: movie => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      )
    },
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
    const { recipes, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={recipes}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default RecipesTable;
