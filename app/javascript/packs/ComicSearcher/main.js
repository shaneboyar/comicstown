import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Issue, Loader, SearchField } from '../Components'

class ComicSearcher extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      issues: null,
      search_id: null,
      page: 1
    }
  }

  componentDidUpdate(){
    document.addEventListener('scroll', this.trackScrolling);
  }

  isBottom = (el) => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementsByClassName('IssueIndex_SearchResults')[0];
    if (this.isBottom(wrappedElement)) {
      const page = this.state.page + 1;
      if (page <= this.state.total_pages) {
        this.appendComics(this.state.query, page);
      }
      document.removeEventListener('scroll', this.trackScrolling);
    }
  };

  handleErrors = (response) => {
    if (!response.ok) {
      console.log(response.statusText);
    }
    return response;
  }

  fetchComics = (query, page=1) => {
    this.setState({ loading: true });
    fetch(`http://localhost:3000/api/v1/issues/search?query=${escape(query)}&uid=${window.current_user_id}&page=${page}`)
    .then(this.handleErrors)
    .then(results => {
      return results.json();
    }).then(data => {
      this.setState({
        query: query,
        issues: data.issues,
        loading: false,
        search_id: data.search_id,
        page: data.page,
        total_pages: data.total_pages
      });
    }).catch(error => {
      console.log(error);
      this.setState({
        loading: false,
        issues: null
      })
    });
  }

  appendComics = (query, page=1) => {
    this.setState({ loading: true });
    fetch(`http://localhost:3000/api/v1/issues/search?query=${escape(query)}&uid=${window.current_user_id}&page=${page}`)
    .then(this.handleErrors)
    .then(results => {
      return results.json();
    }).then(data => {
      this.setState({
        query: query,
        issues: [...this.state.issues, ...data.issues],
        loading: false,
        search_id: data.search_id,
        page: data.page,
        total_pages: data.total_pages
      });
    }).catch(error => {
      console.log(error);
      this.setState({
        loading: false,
        issues: this.state.issues
      })
    });
  }

  onSubmit = (event, query) => {
    event.preventDefault();
    this.fetchComics(query);
  }

  renderIssues = () => {
    const { onClick, scrollerId } = this.props;
    return (
      <div className="IssueIndex_SearchResults">
        {this.state.issues &&this.state.issues.map(issue => (
          <div style={{position: 'relative'}} onClick={(e) => onClick(e, scrollerId, issue)}>
            <Issue size={this.props.issueSize} key={issue.id} issue={issue} sid={this.state.search_id} />
            {this.renderAddButton()}
          </div>
        ))}
      </div>
    )
  }

  renderAddButton = () => {
    if (this.props.onClick) {
      return (
        <a data-remote="true" style={{position: 'absolute', bottom: '16px', right: '16px'}} className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></a>
      );
    }
  }

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
