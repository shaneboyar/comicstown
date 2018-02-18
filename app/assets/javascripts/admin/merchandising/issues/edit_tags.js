$(document).ready(function () {
  var tags = String($('.chips').data('tags')).split(",");
  var data = tags.map(tag => {return {tag}})
  var auto_complete = {}
  for (tag of tags) { auto_complete[tag] = null }
  $('.chips').material_chip({
    data: data,
    placeholder: 'Enter a tag',
    secondaryPlaceholder: '+Tag',
    autocompleteOptions: {
      data: auto_complete,
      limit: Infinity,
      minLength: 1
    }
  });
});