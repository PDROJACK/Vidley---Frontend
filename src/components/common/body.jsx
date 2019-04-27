import React, { Component } from "react";
import Like from "./like";
import _ from "lodash";
import {Link} from 'react-router-dom';
//movies
//HandleLiked
//HandleDelete
class TableBody extends Component {
  handleColumn = (item, column) => {
    if (column.contents) return column.contents(item);
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  selectMovie = (item,column) => {
    if(column.label==='Title') return  <Link to={`/movies/${item._id}`}>{this.handleColumn(item, column)}</Link>;
    return this.handleColumn(item, column);
  }

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.selectMovie(item,column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
