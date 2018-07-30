import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { increment, decrement, incrementAsync } from "../actions/counter";

const Counter = props => (
  <div>
    Counter: {props.count}
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
  count: state.count
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
