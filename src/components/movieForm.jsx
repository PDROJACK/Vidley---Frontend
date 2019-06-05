import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

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
    _id: Joi.string(),
    title: Joi.string()
          .label("Title")
          .required(),
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

  async populateMovie(){
    try{
      const movieId = this.props.match.params.id;
      if(movieId==="new") return;
      const {data:movie} = await getMovie(movieId);
      this.setState({data: this.mapToViewModel(movie)})
    } catch(ex) {
      if(ex.response && ex.response.status === 404) 
        alert("movies not found")
      }   
  }

  async populateGenres(){
    const {data:genre} = await getGenres();
    this.setState({genre})
  }

  async componentDidMount(){
    await this.populateGenres();
    await this.populateMovie();
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

  doSubmit = async () => {
    //call the server
    await saveMovie(this.state.data);

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
