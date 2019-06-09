import React, { Component } from "react";
import Table from "./common/table";
import Like from "./common/like";
import auth from "../services/authService";

class MovieTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stocks" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "Like",
      contents: item => (
        <Like liked={item.liked} onClick={() => this.props.handleLiked(item)} />
      )
      }
  ];

  deleteColumn(){
    this.columns.push({
      key: "Delete",
      contents: movie => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => this.props.handleDelete(movie)}
        >
          Delete
        </button>
      )
    });
  }

  constructor(){
    super();
    const user = auth.getCurrentUser();
    if(user && user.isAdmin) 
      this.deleteColumn();  
  }

  render() {
    
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        movies={movies}
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default MovieTable;
