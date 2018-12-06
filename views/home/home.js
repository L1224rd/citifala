$('document').ready(() => {
  $.get('/eleicao', (res) => {
    continueFunction(res);
  });

  if(window.location.href.includes('proximo')) $('#remove-first').css('display', 'block');

  const continueFunction = (eleicao) => {
    if (eleicao === 'yes') $('#levelSpan').css('display', 'block');

    $('form').submit((e) => {
      e.preventDefault();
      const name = $('#name').val();
      const level = $('#level').val();
      $.post('/', { name, level });
    });

    $('#remove-first').click(() => {
      $.get('/proximo_remove');
    });

    setInterval(() => {
      $.get('/fala', (res) => {
        $('#fala').html('');
        res.forEach(person => {
          $('#fala').append(`<p>${person.name}${eleicao === 'yes' ? ` - ${person.level}` : ''}</p>`);
        });
      });
    }, 1000);
  }
});