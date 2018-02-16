import React from 'react'
import PropTypes from 'prop-types'
import Grid from 'react-virtualized/dist/commonjs/Grid'

class ComicScroller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      issues: []
    }
  }

  componentDidMount(){
    this.fetchNewComics();
  }

  fetchNewComics = () => {
    fetch('http://localhost:3000/api/v1/issues/new-releases')
    .then(this.handleErrors)
    .then(results => {
      return results.json();
    }).then(issues => {
      this.setState({
        loading: false,
        issues
      });
    }).catch(error => {
      console.log(error);
    });
  }

  renderIssues = (columnIndex, key, style) => {
    console.log(style);
    return (
      <div key={key} style={style}>
        <Issue issue={this.state.issues[columnIndex]} />
      </div>
    );
  }

  render(){
    console.log(this.state.issues);
    return (
      <React.Fragment>
        <h5>New Releases</h5>
        <Grid
          cellRenderer={({ columnIndex, key, rowIndex, style }) => this.renderIssues(columnIndex, key, style)}
          columnCount={this.state.issues.length}
          columnWidth={400}
          height={650}
          rowCount={1}
          rowHeight={650}
          width={1200}
        />
      </React.Fragment>
    );
  }
};

const Issue = ({issue}) => (
  <a href={`/issues/${issue.id}`}>
    <div className="IssueIndex_SearchResult">
      <img src={issue.external_image_url} />
      <p>{issue.title}</p>
    </div>
  </a>
);

export default ComicScroller;