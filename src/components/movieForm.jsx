import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";
import {toast} from "react-toastify"; 

class movieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genre:[],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
    .min(0)
    .max(100)
    .required()
    .label("Numbers in stock"),
    dailyRentalRate: Joi.number()
    .min(0)
    .max(10)
    .required()
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
        toast.alert("Movie is not present")
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
      numberInStock: movie.numberInStock,
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
          {this.renderSelect("genreId","Genre",this.state.genre)}
          {this.renderInput("numberInStock", "Numbers in stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default movieForm;
