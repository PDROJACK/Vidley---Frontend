import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";

class movieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStocks: "",
      dailyRentalRate: ""
    },
    genre:[],
    errors: {}
  };

  schema = {
    _id: Joi.string().required(),
    title: Joi.string()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStocks: Joi.number()
    .integer()
    .min(0)
    .max(100)
    .required()
    .label("Numbers in stock"),
    dailyRentalRate: Joi.number()
    .integer()
    .min(0)
    .max(10)
    .label("Rate")
  };

  componentDidMount(){
    const genre = getGenres();
    this.setState({genre})

    const movieId = this.props.match.params.div
    if(movieId==="new") return;

    const movie = getMovie(movieId);
    if(!movie) this.props.history.replace("/not-found")

    this.setState({data: this.mapToViewModel(movie)})
  }

  mapToViewModel(movie){
    return{
      _id:movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStocks: movie.numberInStocks,
      dailyRentalRate: movie.dailyRentalRate
    }
  }

  doSubmit = () => {
    //call the server
    saveMovie(this.state.data)

    this.props.history.push("/movies")
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genre", "Genre")}
          {this.renderInput("numbersInStock", "Numbers in stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default movieForm;
