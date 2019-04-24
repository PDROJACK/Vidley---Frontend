import React, { Component } from "react";
import Like from "./like";
import _ from "lodash";
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

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.handleColumn(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
