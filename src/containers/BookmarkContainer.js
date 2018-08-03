import React from "react";
import { connect } from "react-redux";
import { increment, decrement, incrementAsync } from "../actions/counter";

class BookmarkContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  componentWillMount() {
    this.props.incrementAsync();
  }

  render() {
    return (
      <div>
        <div>Address</div>
        <div>Maps</div>
      </div>
    );
  }
}

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
)(BookmarkContainer);
