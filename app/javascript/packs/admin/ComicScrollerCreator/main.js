import React from 'react'
import PropTypes from 'prop-types'
import ComicSearcher from '../../ComicSearcher/main'
import DraggableComics from './DraggableComics';

class ComicScrollerCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scroller: this.props.scroller,
      issues: [...this.props.issues],
      order_updated: false
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

  deleteComicScrollerItem = (id) => {
    $.ajax({
      type: "DELETE",
      url: `/api/v1/comic_scrollers/${this.state.scroller.id}/comic_scroller_items/${id}`,
      success: (data) => {
        const nextIssues = this.state.issues.filter(issue => issue.id !== data.id);
        this.setState({
          issues: nextIssues
        })
      },
      error: (data) => {
        alert(data.responseText);
        return false
      }
    });
  }

  onReorder = (issues) => {
    this.setState({
      issues,
      order_updated: true
    });
  }

  onSave = () => {
    for ([index, issue] of this.state.issues.entries()) {
      $.ajax({
        type: "PATCH",
        url: `/api/v1/comic_scrollers/${this.state.scroller.id}/comic_scroller_items/${issue.id}`, // Cant I find a way to use comic_scroller_item_id??
        data: {
          newIndex: index
        }
      });
    }
    this.setState({
      order_updated: false
    })
  }

  render() {
    const { scroller, issues } = this.state;
    return(
      <div>
        <h1>{scroller.title}</h1>
        <ComicSearcher issueSize='small' scrollerId={scroller.id} onClick={this.onClick} />
        <DraggableComics
          scrollerId={scroller.id}
          issues={issues}
          onReorder={(issues) => this.onReorder(issues)}
          afterDrag={(id) => this.deleteComicScrollerItem(id)} />
        <button onClick={this.onSave}
                disabled={!this.state.order_updated}
                type="button"
                className="btn waves-effect waves-light">
                Save Order
          <i className="material-icons right">archive</i>
        </button>
      </div>
    );
  }
}


export default ComicScrollerCreator;