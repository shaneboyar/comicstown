// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>ComicSearcher React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import ComicSearcher from './ComicSearcher/main'
import ComicScroller from './ComicScroller/main'
import ComicScrollerCreator from './admin/ComicScrollerCreator/main'

document.addEventListener('DOMContentLoaded', () => {
  const searcher_container = document.getElementById('comicsearcher');
  if(searcher_container) {
    ReactDOM.render(<ComicSearcher />, searcher_container)
  }
  const scroller_containers = document.getElementsByClassName('comic-scroller');
  if(scroller_containers) {
    for ( let scroller_container of scroller_containers){
      const type = scroller_container.getAttribute('type');
      ReactDOM.render(<ComicScroller type={type} />, scroller_container);
    }
  }
  const scroll_creator_container = document.getElementById('scrollcreator');
  if(scroll_creator_container) {
    const scroller = $('#scrollcreator').data('scroller');
    const issues = $('#scrollcreator').data('issues');
    ReactDOM.render(<ComicScrollerCreator issues={issues} scroller={scroller}/>, scroll_creator_container)
  }
})
