import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import MovieTable from "./moviesTable.jsx";
import Pagination from "./common/pagination";
import Filtering from "./common/filtering";
import { paginate } from "../utils/pagination";
import _ from "lodash";
import {Link} from "react-router-dom";
import SearchBox from "./common/search";

export default class Table extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount(){
    const {data:resultGenre} = await getGenres();
    const {data:resultMovie} = await getMovies();
    const genre = [{ _id: "", name: "All Genre" }, ...resultGenre];
    this.setState({
      movies: resultMovie,
      genres: genre
    });
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({
      movies
    });

    try{
      await deleteMovie(movie._id)
    } catch(ex) {
      if(ex.response && ex.response.status === 404){
        alert("Movie already deleted");
      }
      this.setState({movies:originalMovies});
    }
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
      searchQuery: "",
      currentPage: 1
    });
  };

  handleSearch = query => {
    this.setState({searchQuery: query, selectedGenre: null , currentPage: 1})
  } 

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      sortColumn,
      pageSize,
      movies: allMovies,
      selectedGenre,
      currentPage,
      searchQuery
    } = this.state;

    let filtered = allMovies;
    if(searchQuery)
      filtered=allMovies.filter(m=>m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
    else if (selectedGenre && selectedGenre._id) {
       filtered = allMovies.filter(m => m.genre._id === selectedGenre._id)
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(currentPage, pageSize, sorted);

    return { totalCount: filtered.length, data: movies };
  };

  render(){
    const { length: count } = this.state.movies;
    const {
      currentPage,
      selectedGenre,
      pageSize,
      movies,
      searchQuery,
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
              {this.props.user && <Link to="/movies/new"><button className="btn btn-primary" onClick="/login">Add New Movie</button></Link>}
              <Filtering
                items={genres}
                selectedItem={selectedGenre}
                onItemSelect={this.handleGenreSelect}
              />
            </ul>
          </div>
          <div clasName="col">
          <h5> There are {totalCount} movies in database</h5>
          <SearchBox value={searchQuery} onChange={this.handleSearch}/>
            <MovieTable
              user= {this.props.user}
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
