// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>ComicSearcher React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import ComicSearcher from './ComicSearcher/main'
import ComicScroller from './ComicScroller/main'

document.addEventListener('DOMContentLoaded', () => {
  const searcher_container = document.getElementById('comicsearcher');
  if(searcher_container) {
    ReactDOM.render(<ComicSearcher />, searcher_container)
  }
  const scroller_container = document.getElementById('comic-scroller');
  if(scroller_container) {
    ReactDOM.render(<ComicScroller />, scroller_container)
  }
})
