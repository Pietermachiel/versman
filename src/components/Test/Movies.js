import React, { Component } from 'react'
import { getMovies } from '../../services/fakeMovieService';
import MoviesTable from './MoviesTable';
import Like from "../common/like";
import Pagination from "../common/Pagination";
import { paginate } from '../utils/paginate';
import Genres from '../common/genres';
import _ from 'lodash';
import axios from 'axios';

export default class Movies extends Component {
    state = {
        movies: getMovies(),
        assorti: [],
        assortiment: [],
        pageSize: 4,
        currentPage: 1,
        activeGenre: 'All',
        sortColumn: { path: 'title', order: 'asc'}
    }

    handleDelete = e => {
        const movies = this.state.movies.filter(m => m._id !== e._id);
        this.setState({ movies });
    }

    handleLike = (e) => {
        console.log(e);
        const movies = [...this.state.movies];
        const index = movies.indexOf(e);
        console.log(index);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    }

    handleMoviesPlus = (e) => {
        console.log(e);
        const movies = [...this.state.movies];
        const index = movies.indexOf(e);
        movies[index] = { ...movies[index] };
        movies[index].numberInStock = movies[index].numberInStock + 1;
        console.log(movies[index].numberInStock);
        this.setState({ movies });
        console.log(movies);
    }

    handleMoviesMinus = (e) => {
        console.log(e);
        const movies = [...this.state.movies];
        const index = movies.indexOf(e);
        movies[index] = { ...movies[index] };
        movies[index].numberInStock = movies[index].numberInStock - 1;
        console.log(movies[index].numberInStock);
        this.setState({ movies });
        console.log(movies);
    }

    handlePageChange = (e) => {
        console.log(e);
        this.setState({ currentPage: e });
    }

    handleChange = (e) => {
        this.setState({ activeGenre: e, currentPage: 1 });
    }

    handleSort = (e) => {
        console.log(e);
        const sortColumn = { ...this.state.sortColumn };
        if (sortColumn.path === e)
            sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
        else {
            sortColumn.path = e;
            sortColumn.order = "asc";
        }
        // this.setState({ sortColumn: { path: e, order: 'asc'} });
        this.setState({ sortColumn });
    }

    render() {
        const { assorti } = this.state;
        console.log(assorti);

        const { length: count } = this.state.movies;
        const { 
            pageSize, 
            currentPage, 
            sortColumn,
            activeGenre, 
            movies: allMovies 
        } = this.state;

        // 1. filter
        const filtered = activeGenre && activeGenre !== "All"
            ? allMovies.filter(m => m.genre.name === activeGenre)
            : allMovies;

        // 2. sort

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order] );

        // 3. paginate
        const pagedmovies = paginate(sorted, currentPage, pageSize);   // movies (items) = this.state.movies
                                 // 'sorted' was 'filtered' was 'allMovies' was 'movies
        return (
            <React.Fragment>
                <div className="container table-box">
                    { 
                        filtered.length === 0 
                        ? <p>There are no movies</p> 
                        : <p>Showing {filtered.length} movies in the database</p> 
                    }

                    <Genres 
                        onChange={this.handleChange}
                        activeGenre={activeGenre}
                    />

                    <Pagination 
                        itemsCount={filtered.length}  // this.state.movies.length
                        pageSize={pageSize}   // this.state.pageSize
                        onPageChange={this.handlePageChange}  
                        currentPage={currentPage}  // this.state.currentPage
                    />   

                    <MoviesTable 
                        activeGenre={activeGenre}
                        pagedmovies={pagedmovies}
                        onDelete={this.handleDelete}
                        onMoviesMinus={this.handleMoviesMinus}
                        onMoviesPlus={this.handleMoviesPlus}
                        onSort={this.handleSort}
                    />

                </div>
            </React.Fragment>
        )
    }
}
