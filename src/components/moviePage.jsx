import React, { Component } from "react";

class MovieDetails extends Component{
    render(){
        return(
            <div>
            <h3>Movie {this.props.match.params.id}</h3>
                <button className='button'>Save</button>
            </div>
        );
    }
}


export default MovieDetails;