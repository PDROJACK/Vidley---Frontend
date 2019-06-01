import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MovieTable from "./moviesTable.jsx";
import Pagination from "./common/pagination";
import Filtering from "./common/filtering";
import { paginate } from "../utils/pagination";
import _ from "lodash";
import {Link} from "react-router-dom";

export default class Table extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genre = [{ _id: "", name: "All Genre" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres: genre
    });
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
    });
  };

  handleGenreSelect = genre => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      sortColumn,
      pageSize,
      movies: allMovies,
      selectedGenre,
      currentPage
    } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(currentPage, pageSize, sorted);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      currentPage,
      selectedGenre,
      pageSize,
      movies: allMovies,
      genres,
      sortColumn
    } = this.state;

    if (count === 0) return <p>There are no movies in database</p>;

    const { totalCount, data: movies } = this.getPagedData();
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <ul className="list-group">
              <Filtering
                items={genres}
                selectedItem={selectedGenre}
                onItemSelect={this.handleGenreSelect}
              />
            </ul>
          </div>
          <div clasName="col">
          <h5> There are {totalCount} movies in database</h5>
          <Link to="/movies/new"><button className="btn btn-primary" onClick="/login">Add New Movie</button></Link>
            <MovieTable
              movies={movies}
              sortColumn={sortColumn}
              onSort={this.handleSort}
              handleLiked={this.handleLiked}
              handleDelete={this.handleDelete}
            />
            <Pagination
              itemCount={totalCount}
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
