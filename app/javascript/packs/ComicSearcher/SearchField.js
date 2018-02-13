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
      <div className="row">
        <form className="col s12" onSubmit={(event) => {
                                            this.props.onSubmit(event, this.state.value);
                                            this.setState({value: ''})}}>
          <div className="row">
            <div className="input-field inline col s12 SeriesIndex_SearcherForm">
              <textarea id="textarea1" className="materialize-textarea SeriesIndex_SearcherFormField" value={this.state.value} onChange={this.handleChange} />
              <label htmlFor="textarea1">Title, Author, Whatever</label>
              <button className="btn waves-effect waves-light" type="submit" value="Submit">Search
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ComicSearcher;
