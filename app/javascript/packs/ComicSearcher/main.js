import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Issue from './Issue'
import SearchField from './SearchField'
import { Loader } from '../Components'

class ComicSearcher extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      issue: null
    }
  }

  fetchComic = (query) => {
    this.setState({ loading: true });
    fetch(`http://localhost:3000/api/v1/issues/${escape(query)}`)
    .then(results => {
      return results.json();
    }).then(data => {
      this.setState({
        issue: data.issue,
        loading: false
      });
    })
  }

  onSubmit = (event, value) => {
    this.fetchComic(value);
    event.preventDefault();
  }

  renderSearcher = () => {
    if(this.state.loading) {
      return <Loader />;
    } else {
      return <SearchField onSubmit={this.onSubmit} />;
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.renderSearcher()}
        {this.state.issue && <Issue issue={this.state.issue} />}
      </React.Fragment>
    )
  }
}

ComicSearcher.propTypes = {
  issue: PropTypes.object,
  loading: PropTypes.bool
}

export default ComicSearcher;
