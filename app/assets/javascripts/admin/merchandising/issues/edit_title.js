$(document).ready(function() {
  let title = $('.AdminIssueEdit_Title').first();
  let button = $('.AdminIssueEdit_TitleEditButton').first();
  if (title.attr('disabled') === 'disabled') {
    button.addClass('red');
    button.attr('type', 'button');
    $(this).find('.material-icons').first().text("edit");
  }

  button.on('click', (e) => {
    if ($(this).find('.material-icons').first().text() === 'edit') { e.preventDefault(); }
    button.removeClass('red');
    $(this).find('.material-icons').first().text("check");
    button.attr('type', 'submit');
    title.removeAttr('disabled').focus();
  });
});

$(document).ajaxComplete(function() {
  let title = $('.AdminIssueEdit_Title').first();
  let button = $('.AdminIssueEdit_TitleEditButton').first();
  if (title.attr('disabled') === 'disabled') {
    button.addClass('red');
    button.attr('type', 'button');
    $(this).find('.material-icons').first().text("edit");
  }

  button.on('click', (e) => {
    if ($(this).find('.material-icons').first().text() === 'edit') { e.preventDefault(); }
    button.removeClass('red');
    $(this).find('.material-icons').first().text("check");
    button.attr('type', 'submit');
    title.removeAttr('disabled').focus();
  });
});