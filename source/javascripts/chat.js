var ChatEmu = (function() {
  'use strict';
  var dialog = {
    a1: 'hallo',
    b1: 'ja?',
    a2: 'bin ich hier richtig?',
    b2: 'ja natürlich'
  };
  var chatWindow = $('div.chat');
  var input = $('#type-write');
  var inputContainer = $('div.type-write');

  var ChatEmu = {
    init: function() {
        this.timeNextBubble(dialog.a1);
    },
    randomInteger: function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    timeNextBubble: function(text) {
      return new Promise(
        resolve => {
          setTimeout(this.putBubble(text), this.randomInteger(1000, 3000));
        },
        reject => {

        }

      );
    },
    putBubble: function(text, meOrYou = 'you') {
      var chatBubble = $('<div>').attr({
        class: 'bubble ' + meOrYou
      });
      $('<div>').append(text).appendTo(chatBubble);
      chatBubble.prependTo(inputContainer);
    },
  };

  return ChatEmu;
}());