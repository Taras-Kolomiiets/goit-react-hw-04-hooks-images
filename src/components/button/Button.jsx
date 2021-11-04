import React from "react";
import classes from "./button.module.css";
import PropTypes from "prop-types";

const Button = ({ onLoadMore }) => {
  return (
    <button className={classes.Button} onClick={onLoadMore}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
