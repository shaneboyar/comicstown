import React from 'react'
import PropTypes from 'prop-types'
import ComicSearcher from '../../ComicSearcher/main'
import DraggableComics from './DraggableComics';

class ComicScrollerCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scroller: this.props.scroller,
      items: [...this.props.items],
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
          items: [...this.state.items, data]
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
        const nextItems = this.state.items.filter(item => item.id !== data.id);
        this.setState({
          items: nextItems
        })
      },
      error: (data) => {
        alert(data.responseText);
        return false
      }
    });
  }

  onReorder = (items) => {
    this.setState({
      items,
      order_updated: true
    });
  }

  onSave = () => {
    let data = []
    for ([index, item] of this.state.items.entries()) {
      data.push({item_id: item.id, new_index: index});
    }
    console.log(data);
    $.ajax({
      type: "PATCH",
      url: `/api/v1/comic_scrollers/${this.state.scroller.id}`,
      data: {updates: data}
    });
    this.setState({
      order_updated: false
    })
  }

  render() {
    const { scroller, items } = this.state;
    return(
      <div>
        <h1>{scroller.title}</h1>
        <ComicSearcher issueSize='small' scrollerId={scroller.id} onClick={this.onClick} />
        <DraggableComics
          scrollerId={scroller.id}
          issues={items}
          onReorder={(items) => this.onReorder(items)}
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