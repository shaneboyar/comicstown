import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const Issue = ({issue}) => (
  <a href={`/issues/${issue.id}`}>
    <div className="IssueIndex_SearchResult">
      <img src={issue.external_image_url} />
      <h4>{issue.title}</h4>
    </div>
  </a>
);

export default Issue;