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

  fetchComic = (query) => {
    this.setState({ loading: true });
    fetch(`http://localhost:3000/api/v1/issues/search/${escape(query)}`)
    .then(results => {
      return results.json();
    }).then(data => {
      var result = data.issues.map(issue => issue._source)
      this.setState({
        issues: result,
        loading: false
      });
    })
  }

  onSubmit = (event, value) => {
    event.preventDefault();
    this.fetchComic(value);
  }

  renderSearcher = () => {
    if(this.state.loading) {
      return <Loader />;
    } else {
      return <SearchField onSubmit={this.onSubmit} />;
    }
  }

  renderIssues = () => (
    this.state.issues.map(issue => (
      <Issue key={issue.id} issue={issue} />
    ))
  )

  render() {
    return (
      <React.Fragment>
        {this.renderSearcher()}
        <div className="IssueIndex_SearchResults">
          {this.state.issues && this.renderIssues()}
        </div>
      </React.Fragment>
    )
  }
}

ComicSearcher.propTypes = {
  issue: PropTypes.object,
  loading: PropTypes.bool
}

export default ComicSearcher;
