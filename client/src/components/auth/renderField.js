import React from "react";

const renderField = ({
  input,
  label,
  icon,
  type,
  meta: { touched, error }
}) => (
  <div>
    <i className="material-icons prefix white-text">{icon}</i>
    <input {...input} placeholder={label} type={type} />
    {touched && error && <span className="error-color">{error}</span>}
  </div>
);

export default renderField;
