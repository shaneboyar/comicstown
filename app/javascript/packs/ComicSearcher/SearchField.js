import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Issue from './Issue.js'
import { Loader } from '../Components';

class ComicSearcher extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: ''
    }
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <form onSubmit={() => this.props.onSubmit(event, this.state.value)}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default ComicSearcher;
