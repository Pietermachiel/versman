import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';

import RecipesTable from "./recipesTable";
import ListGroup from "../common/listGroup";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";

// const apiRecipes = "https://hetkookt.herokuapp.com/api/recipes";

export class Test extends Component {
    state = {
        recipes: [],
        categories: [],
        currentPage: 1,
        pageSize: 20,
        sortColumn: { path: "title", order: "asc" }    
    }
    
    async componentDidMount() {
        const recipes = this.props.therecipes;
        this.setState({ recipes });

        const categories = this.props.thecategories;
        this.setState({ categories });

        this.setState( prevState => ({
            categories: [{id: "", title: 'All'}, ...prevState.categories]
         }));
    }

    handleDelete = e => {    
        const recipes = this.state.recipes.filter(m => m._id !== e._id);
        this.setState({ recipes });
    };

    handleLike = movie => {
        const recipes = [...this.state.recipes];
        const index = recipes.indexOf(movie);
        recipes[index] = { ...recipes[index] };
        recipes[index].liked = !recipes[index].liked;
        this.setState({ recipes });
    };

    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, currentPage: 1 });
    };

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    };

    getPagedData = () => {
        const {
            pageSize,
            currentPage,
            sortColumn,
            selectedGenre,
            recipes: allMovies
        } = this.state;

        const filtered =
            selectedGenre && selectedGenre._id
            ? allMovies.filter(m => m.category._id === selectedGenre._id)
            : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const recipes = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: recipes };
    };

    render() {
        // const { therecipes, thecategories } = this.props;

        const { length: count } = this.state.recipes;
        const { pageSize, currentPage, sortColumn } = this.state;

        // if (count === 0) return <p>There are no movies in the database.</p>;

        const { totalCount, data: recipes } = this.getPagedData();

    return (
        <div className="container">
            <div className="">
                <ListGroup
                items={this.state.categories}   // items={this.state.categories}
                selectedItem={this.state.selectedGenre}
                onItemSelect={this.handleGenreSelect}
                />
            </div>
            <div className="container table-box">
                <p>Showing {totalCount} recipes in the database.</p>
                <RecipesTable
                recipes={recipes}
                sortColumn={sortColumn}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
                />
                <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
                />
            </div>
        </div>
    );
    }
}

function mapStateToProps(state) {   // maps products from redux store on to our props
    return {
      therecipes: state.therecipes,
      thecategories: state.thecategories,
    }
  }

export default connect(mapStateToProps)(Test) // , mapDispatchToProps