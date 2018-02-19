import React from 'react'
import PropTypes from 'prop-types'

const Issue = ({issue, sid, size = 'normal'}) => {
  const img_height = size === 'small' ? '250px' : 'inherit'
  return (
    <a href={`/issues/${issue.id}?sid=${sid}`}>
      <div className="IssueIndex_SearchResult">
        <img style={{maxHeight: img_height}} src={issue.external_image_url} alt={issue.title} />
      </div>
    </a>
  );
}


export default Issue;