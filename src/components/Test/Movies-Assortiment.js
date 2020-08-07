import React, { Component } from 'react'
import axios from 'axios';
import connect from 'react-redux';

import RecipesTable from "./recipesTable";
import ListGroup from "../common/listGroup";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";

const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";
const apiRecipes = "https://hetkookt.herokuapp.com/api/recipes";

export default class Test extends Component {
    state = {
        posts: [],
        recipes: [],
        categories: [],
        // movies: [],
        // genres: [],
        currentPage: 1,
        pageSize: 10,
        sortColumn: { path: "title", order: "asc" }    
    }
    
    // componentDidMount() {
    //     fetch('https://humane-fox.cloudvent.net/api/assortiment.json')
    //     .then(response => response.json())
    //     .then( result => { this.setState({ assorti: result }) });

    //     const promise = axios.get("https://humane-fox.cloudvent.net/api/assortiment.json");
    //     console.log("promise");
    //     console.log(promise);
    // }

    // https://medium.com/@binyamin/enabling-async-await-and-generator-functions-in-babel-node-and-express-71e941b183e2

    async componentDidMount() {
        const { data: posts } = await axios.get(apiEndpoint);
        this.setState({ posts });
        console.log("posts");
        console.log(posts);

        const { data: recipes } = await axios.get(apiRecipes);
        this.setState({ recipes });
        console.log("recipes");
        console.log(recipes);

        var { data: categories } = await axios.get("https://hetkookt.herokuapp.com/api/categories");
        this.setState({ categories });
        console.log("categories");
        console.log(categories);

        categories = [{ _id: "", title: "All Genres" }, ...this.state.categories];
        this.setState({ categories })
        console.log(categories);
    }
    
    //   componentDidMount() {
    //     const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    
    //     this.setState({ movies: getMovies(), genres });
    //   }
    handleAdd = async () => {
        const obj = { title: 'a' };
        const { data: post } = await axios.post(apiEndpoint, obj);
        console.log("post");
        console.log(post);
    }

    handleDelete = movie => {
        // const movies = this.state.movies.filter(m => m._id !== movie._id);
        // this.setState({ movies });        
        const recipes = this.state.recipes.filter(m => m._id !== movie._id);
        this.setState({ recipes });
    };

    handleLike = movie => {
        // const movies = [...this.state.movies];
        // const index = movies.indexOf(movie);
        // movies[index] = { ...movies[index] };
        // movies[index].liked = !movies[index].liked;
        // this.setState({ movies });
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
            // movies: allMovies
            recipes: allMovies
        } = this.state;

    const filtered =
        selectedGenre && selectedGenre._id
        // ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        ? allMovies.filter(m => m.category._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    // const movies = paginate(sorted, currentPage, pageSize);
    const recipes = paginate(sorted, currentPage, pageSize);

    // return { totalCount: filtered.length, data: movies };
    return { totalCount: filtered.length, data: recipes };
    };

    render() {
        const { therecipes } = this.props;
        console.log("therecipes");
        console.log(therecipes);
        // const { length: count } = this.state.movies;
        const { length: count } = this.state.recipes;
        const { pageSize, currentPage, sortColumn } = this.state;

        if (count === 0) return <p>There are no movies in the database.</p>;

        // const { totalCount, data: movies } = this.getPagedData();
        const { totalCount, data: recipes } = this.getPagedData();

    return (
        <div className="container">
            <button onClick={this.handleAdd}>AddPost</button>
        <div className="">
            <ListGroup
            items={this.state.categories}   // items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
            />
        </div>
        <div className="container table-box">
            <p>Showing {totalCount} movies in the database.</p>
            <RecipesTable
            // movies={movies}
            movies={recipes}
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

