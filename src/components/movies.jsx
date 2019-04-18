import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import Filtering from './common/filtering';
import { paginate } from '../utils/pagination';


export default class Table extends Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: null,
    pageSize: 4,
    currentPage: 1
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: getGenres()
    })
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({
      movies: movies
    });
  };

  handleLiked = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({
      currentPage: page
    })
  };

  handleGenreSelect = genre => {
    this.setState({
      selectedGenre: genre
    })
  }

  render() {
    const { length: count } = this.state.movies;
    const { currentPage, selectedGenre, pageSize, movies: allMovies, genres } = this.state;

    if (count === 0) return <p>There are no movies in database</p>;

    const filtered = selectedGenre ? allMovies.filter(m => m.genre._id === selectedGenre) : allMovies

    const movies = paginate(currentPage, pageSize, filtered);

    return (
      <div className='container'>
        <h4> There are {filtered.length} movies in database </h4>
        <div className='row'>
          <div className='col-2'>
            <ul className="list-group">
              <li className="list-group-item" onItemSelect={() => this.handleGenreSelect()}>All genres</li>
              <Filtering items={genres} selectedItem ={selectedGenre} onItemSelect={this.handleGenreSelect} />
            </ul>
          </div>
          <div clasName='col-8'>
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Stock</th>
                  <th>Rent</th>
                  <th> </th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {movies.map(movie => (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <Like
                        liked={movie.liked}
                        onClick={() => this.handleLiked(movie)}
                      />
                    </td>
                    <td>
                      <span
                        onClick={() => this.handleDelete(movie)}
                        className="btn btn-danger"
                      >
                        Delete
                  </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              itemCount={filtered.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
