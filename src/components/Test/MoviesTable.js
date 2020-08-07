import React, { Component } from 'react'
import Like from "../common/like";

export default class MoviesTable extends Component {

    render() {

        const { activeGenre, pagedmovies, onDelete, onMoviesMinus, onMoviesPlus, onSort} = this.props;

        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th onClick={() => onSort('title')}>Title</th>
                            <th onClick={() => onSort('genre')}>Genre</th>
                            <th onClick={() => onSort('numberInStock')}>Stock</th>
                            <th onClick={() => onSort('dailyRentalRate')}>Rate</th>
                            <th>+</th>
                            <th></th>
                            <th>-</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { pagedmovies.map( (hit, id) => {
                            if (hit.genre.name.indexOf(activeGenre) < 0 && activeGenre !== "All") return null;
                            return (
                            <tr key={id}>
                                <th>{hit.title}</th>
                                <td>{hit.genre.name}</td>
                                <td>{hit.numberInStock}</td>                                         
                                <td>{hit.dailyRentalRate}</td>  
                                <td>
                                    <button type="button" className="btn btn-sm btn btn-outline-info" onClick={() => onMoviesPlus(hit)}>+</button>                                      
                                </td>
                                <td>
                                    <button type="button" className="btn btn-sm btn-danger" onClick={() => onDelete(hit)}>delete</button>                                      
                                </td>
                                <td>
                                    <button type="button" className="btn btn-sm btn btn-outline-info" onClick={() => onMoviesMinus(hit)}>-</button>                                      
                                </td>
                                <td>
                                    <Like
                                        liked={hit.liked}
                                        onClick={() => this.handleLike(hit)}
                                    />
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
