(function ($) {
  'use strict';

  $(function () {
    $('#generate-array').on('click', function () {

      if (!$('#array-text').val()) {
        alert('Você deve inserir um código na zona de texto!');

        return;
      }

      if ($('#new-array-zone table').find('tr')) {
        $('#new-array-zone table').html('');
      }

      var array = $('#array-text')
        .val()
          .split('\n')
      ;

      $.each(array, function (index, line) {

        if (!line && !array[index + 1]) {
          return;
        }

        var _index = index + 1;
        var _line  = line
          .replace(/(\s)/g, '$1$1')
          .replace(/\\/g, '\\\\')
          .replace(/'/g, '\\\'')
        ;

        $('<tr>', {
          'class': 'generated-array-line-' + _index,
          'html': [
            '<td>',
            '  <span class="non-select" data-line="' + _index + '"></span>',
            '</td>',
            '<td class="code-column">',
            '  <code class="code-to-text"></code>',
            '</td>'
          ].join('\n')
        })
          .appendTo('#new-array-zone table')
            .find('.code-to-text')
              .text('\'' + _line + '\',')
        ;

        $('#copy-content').text($('#copy-content').text() + '\'' + line + '\',\n');
      });
    });

    var clip = new Clipboard('.btn-copy', {
      target: function() {
        return document.getElementById('copy-content');
      },
    });

    $('.btn-copy').on({
      click: function () {
        $(this).css('color', '#39c');
        $(this).attr('title', 'Copiado!');
      },

      mouseleave: function () {
        $(this).css('color', '#565656');
        $(this).removeAttr('title');
      }
    });
  });
}(jQuery));
