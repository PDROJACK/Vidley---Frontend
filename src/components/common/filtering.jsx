import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Filtering = ({ items, selectedItem, onItemSelect }) => {
  return (
    <div>
      {items.map(item => (
        <li
          key={item._id}
          className={
            selectedItem === item._id
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onItemSelect(item)}
        >
          {item.name}
        </li>
      ))}
    </div>
  );
};

export default Filtering;
