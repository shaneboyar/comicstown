$(document).ready(function () {
  var tags = String($('.chips').data('tags')).split(", ");
  var id = Number($('.chips').data('id'));
  var data = tags.map(tag => {return {tag}})
  var auto_complete_tags = $('.chips').data('autocomplete');
  var auto_complete = {}
  for (tag of auto_complete_tags) { auto_complete[tag] = null }

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

  $('.chips').on('chip.add', function(e, chip){
    $.ajax({
      type: "POST",
      url: `/api/v1/tags`,
      data: {...chip, id: id},
      success: (data) => {
        return false
      },
      error: (data) => {
        alert(data);
        return false
      }
    });
  });

  $('.chips').on('chip.delete', function(e, chip){
    $.ajax({
      type: "DELETE",
      url: `/api/v1/tags`,
      data: {...chip, id: id},
      success: (data) => {
        console.log(data);
        return false
      },
      error: (data) => {
        console.log(data);
        return false
      }
    });
  });
});