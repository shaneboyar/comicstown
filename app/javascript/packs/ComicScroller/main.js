import React from 'react'
import PropTypes from 'prop-types'
import Grid from 'react-virtualized/dist/commonjs/Grid'
import { Loader } from '../Components'

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
    fetch(`http://localhost:3000/api/v1/issues/scroller/?type=${this.props.type}`)
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
    return (
      <div key={key} style={style}>
        <Issue issue={this.state.issues[columnIndex]} />
      </div>
    );
  }

  renderScroller = () => {
    if(this.state.loading) return <Loader />;
    return (
      <Grid
        cellRenderer={({ columnIndex, key, rowIndex, style }) => this.renderIssues(columnIndex, key, style)}
        columnCount={this.state.issues.length}
        columnWidth={380}
        height={650}
        overscanColumnCount={10}
        rowCount={1}
        rowHeight={650}
        scrollLeft={-20}
        style={{left: 16}}
        width={window.innerWidth}
      />
    );
  }

  renderTitle = (type) => {
    var title = type.replace(/-/g, ' ');
    return <h5 className="ComicScroller_Title">{title}</h5>;
  }

  render(){
    return (
      <div className="ComicScroller_Container">
        {this.renderTitle(this.props.type)}
        {this.renderScroller()}
      </div>
    );
  }
};

const Issue = ({issue}) => (
  <a href={`/issues/${issue.id}`}>
    <div className="IssueIndex_SearchResult">
      <img src={issue.external_image_url} />
    </div>
  </a>
);

export default ComicScroller;