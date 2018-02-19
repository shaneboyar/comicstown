import React from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class DragabbleComics extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      issues: props.issues
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props.issues);
    console.log(nextProps.issues);
    if (this.props.issues !== nextProps.issues.length) {
      this.setState({
        issues: nextProps.issues
      })
    }
  }

  getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    display: "flex",
    padding: this.state.issues.length,
    overflow: "auto"
  });

  // a little function to help us with reordering the result
  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      this.props.afterDrag(result.draggableId);
      return;
    }

    const issues = this.reorder(
      this.state.issues,
      result.source.index,
      result.destination.index
    );

    this.props.onReorder(issues);
  }

  renderIssues = () => (
    this.state.issues.map((issue) => {
      <div>
        <Issue issue={issue} />
      </div>
    })
  );

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={this.getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.issues && this.state.issues.map((issue, index) => (
                <Issue issue={issue} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the issues look a bit nicer
  userSelect: "none",
  margin: "0 12px 0 0",

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const Issue = ({issue, index}) => (
  <Draggable key={issue.id} draggableId={issue.id} index={index}>
    {(provided, snapshot) => (
      <div>
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <a href={`/issues/${issue.id}`}>
            <div className="IssueIndex_SearchResult">
              <img src={issue.external_image_url} className="AdminComicScrollers_IssueImages" />
            </div>
          </a>
        </div>
        {provided.placeholder}
      </div>
    )}
  </Draggable>
);

export default DragabbleComics;