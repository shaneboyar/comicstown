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
      issues: null
    }
  }

  handleErrors = (response) => {
    if (!response.ok) {
      console.log(response.statusText);
    }
    return response;
  }

  fetchComic = (query) => {
    this.setState({ loading: true });
    fetch(`http://localhost:3000/api/v1/issues/search/${escape(query)}`)
    .then(this.handleErrors)
    .then(results => {
      return results.json();
    }).then(data => {
      var result = data.issues.map(issue => issue._source)
      this.setState({
        issues: result,
        loading: false
      });
    }).catch(error => {
      console.log(error);
      this.setState({
        loading: false,
        issues: null
      })
    });
  }

  onSubmit = (event, value) => {
    event.preventDefault();
    this.fetchComic(value);
  }

  renderIssues = () => (
    <div className="IssueIndex_SearchResults">
      {this.state.issues &&this.state.issues.map(issue => (
        <Issue key={issue.id} issue={issue} />
      ))}
    </div>
  )

  render() {
    return (
      <React.Fragment>
        <SearchField onSubmit={this.onSubmit} />
        {this.renderIssues()}
      </React.Fragment>
    )
  }
}

ComicSearcher.propTypes = {
  issue: PropTypes.object,
  loading: PropTypes.bool
}

export default ComicSearcher;
