import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { increment, decrement, incrementAsync } from "../actions/counter";

const Counter = props => (
  <div>
    Counter: {props.count}
    <br />
    Status: {props.online ? "TRUE" : "FALSE"}
    <br />
    <button onClick={props.increment}>+</button>
    <button onClick={props.incrementAsync}>+ ASYNC</button>
    <button onClick={props.decrement}>-</button>
  </div>
);

Counter.propTypes = {
  count: PropTypes.number,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  count: state.count,
  online: state.online
});

const mapDispatchToProps = dispatch => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement()),
  incrementAsync: () => dispatch(incrementAsync())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
