import React from "react";

const Input = ({ label, name, onChange, value }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        onChange={onChange}
        name={name}
        value={value}
        autoFocus
        id={name}
        type="text"
        className="form-control"
      />
    </div>
  );
};

export default Input;
