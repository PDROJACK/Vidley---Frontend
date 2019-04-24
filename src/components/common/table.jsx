import React, { Component } from "react";
import TableHeader from "./header";
import TableBody from "./body";

const Table = ({ sortColumn, onSort, columns, movies }) => {
  return (
    <table className="table">
      <TableHeader sortColumn={sortColumn} columns={columns} onSort={onSort} />
      <TableBody data={movies} columns={columns} />
    </table>
  );
};

export default Table;
