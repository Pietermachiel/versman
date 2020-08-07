import React, { Component } from 'react'
import { getGenres } from '../../services/fakeGenreService';

export default class Genres extends Component {
    state = {
        genres: []
    }

    componentDidMount() {
        const genres = [{ name: 'All' }, ...getGenres()]
        this.setState({ genres });  // { genres } = { genres: genres }
    }

    handleGenre = (e) => {
        console.log(e);
        this.props.onChange(e);
    }
    
    render() {
        console.log(this.state.genres);

        // const genresArray = ["All"];
        // this.state.genres.map(hit => {
		// 	const x = hit.name;
		// 	if(genresArray.indexOf(x) === -1)
		// 	genresArray.push(x);        
		// 	return null;
		//     }
        //  )
        // console.log(genresArray);
        const genres = this.state.genres;
        const { activeGenre } = this.props;

        return (
            <div>
                <ul className="list-group flex justify-center mb-4">
                {
                    genres.map( (hit, id) => {
                        return (
                        <li 
                            key={id} 
                            className={ hit.name === activeGenre ? "list-group-item active" : "list-group-item"} 
                            onClick={() => this.handleGenre(hit.name)}>{hit.name}</li>
                        )
                    })
                }
              </ul>
                
            </div>
        )
    }
}
