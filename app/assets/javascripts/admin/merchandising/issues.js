$(document).ready(function() {
  let title = $('.AdminIssueEdit_Title').first();
  let button = $('.AdminIssueEdit_TitleEditButton').first();
  if (title.attr('disabled') === 'disabeled') {
    button.addClass('red');
    $(this).find('.material-icons').first().text("edit");
  }

  button.on('click', (e) => {
    if ($(this).find('.material-icons').first().text() === 'mode_edit') { e.preventDefault(); }
    button.removeClass('red');
    $(this).find('.material-icons').first().text("check");
    title.removeAttr('disabled').focus();
  });
});