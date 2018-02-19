import React from 'react'
import PropTypes from 'prop-types'
import ComicSearcher from '../../ComicSearcher/main'
import DraggableComics from './DraggableComics';

class ComicScrollerCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scroller: this.props.scroller,
      issues: [...this.props.issues]
    }
  }

  onClick = (e, scrollerId, issue) => {
    e.preventDefault();
    e.stopPropagation();
    $.ajax({
      type: "POST",
      url: `/api/v1/comic_scrollers/${scrollerId}/comic_scroller_items`,
      data: {
        issue_id: issue.id
      },
      success: (data) => {
        this.setState({
          issues: [...this.state.issues, data]
        })
      },
      error: (data) => {
        alert(data.responseText);
        return false
      }
    });
  }

  render() {
    const { scroller, issues } = this.state;
    return(
      <div>
        <h1>{scroller.title}</h1>
        <ComicSearcher issueSize='small' scrollerId={scroller.id} onClick={this.onClick} />
        <DraggableComics scrollerId={scroller.id} issues={issues} />
        <button className="btn waves-effect waves-light">Save Order
          <i className="material-icons right">archive</i>
        </button>
      </div>
    );
  }
}


export default ComicScrollerCreator;