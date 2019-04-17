import React from "react";
import _ from 'lodash';


const Pagination = props => {
  const { pageSize, itemCount, currentPage, onPageChange } = props;
  const pageNumber = Math.ceil(itemCount / pageSize)
  if (pageNumber === 1) return null;
  const pages = _.range(1, pageNumber + 1);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map(page => (
          <li key={page} className={page === currentPage ? "page-item active" : "page-item"}>
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
