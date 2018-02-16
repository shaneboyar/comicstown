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
      console.log('search results bottom reached');
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
    fetch(`http://localhost:3000/api/v1/issues/search/?query=${escape(query)}&uid=${window.current_user_id}&page=${page}`)
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
    fetch(`http://localhost:3000/api/v1/issues/search/${escape(query)}/${window.current_user_id}?page=${page}`)
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
        issues: null
      })
    });
  }

  onSubmit = (event, query) => {
    event.preventDefault();
    this.fetchComics(query);
  }

  scrolledToBottom = () => {
    var d = document.documentElement;
    var offset = d.scrollTop + window.innerHeight;
    var height = d.offsetHeight;

    console.log('offset = ' + offset);
    console.log('height = ' + height);

    if (offset >= height) {
      console.log('At the bottom');
    }
  }


  renderIssues = () => (
    <div className="IssueIndex_SearchResults">
      {this.state.issues &&this.state.issues.map(issue => (
        <Issue key={issue.id} issue={issue} sid={this.state.search_id} />
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
