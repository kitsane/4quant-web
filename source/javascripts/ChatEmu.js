
function ChatEmu() {
  "use strict";
    this.dialog = ["hallo", "sali", "Lorem ipsum Ullamco aute amet eu consequat id.", "Lorem ipsum Incididunt in enim ullamco voluptate fugiat sit quis culpa eu cillum nulla Duis.", "ok, na dann", "ja ist gut...", "Jetzt weis ich bescheid.", "ja super sache eh...", "jetzt wird gelabert um des labern willens", "jah, Radiologie rocks, alter!","hallo", "sali", "Lorem ipsum Ullamco aute amet eu consequat id.", "Lorem ipsum Incididunt in enim ullamco voluptate fugiat sit quis culpa eu cillum nulla Duis.", "ok, na dann", "ja ist gut...", "Jetzt weis ich bescheid.", "ja super sache eh...", "jetzt wird gelabert um des labern willens", "jah, Radiologie rocks, alter!"];

    this.typeAnimation();
}

ChatEmu.prototype.chatBubble = function(textContent, who) {
    who = who || "you";
    var bubble = $('<div>').attr('class', 'bubble ' + who);
    var innerBubble = $('<div>').append(textContent);
    innerBubble.appendTo(bubble);
    bubble.appendTo('div.chat-text');
    return bubble;
}

ChatEmu.prototype.dalayResponse = function() {
  return new Promise( (resolve, reject) => {
    setTimeout(() => {
        var text = this.dialog.shift();
        if(typeof text == 'string') {
          resolve(text);
        } else {
          reject(false);
        }
      },
      1500);
  });
}

ChatEmu.prototype.dalayMyResponse = function() {
  return new Promise( (resolve, reject) => {
    setTimeout(() => {
        var text = this.dialog.shift();
        if(typeof text == 'string') {
          resolve(text);
        } else {
          reject(false);
        }
      },
      2000);
  });
}

ChatEmu.prototype.reply = function() {
  var tmPromise = this.dalayResponse();
  tmPromise.then((text) => {
    return this.chatBubble(text, 'you');
  }).then((pre) => {
    var myResponse = this.dalayMyResponse();
    myResponse.then((text) => {this.typeAnimation(text)}).catch((retVal) => { return retVal; });
  }).catch((retVal) => {
    return retVal;
  });
}

ChatEmu.prototype.typeAnimation = function() {
  var text = this.dialog.shift();
  if (text === 'undefined') {
    return false;
  } else {
    var typeField = $('<div>');
    $('#type-write').append(typeField);
    $(typeField).typed({
        strings: [text],
        stringsElement: null,
        typeSpeed: 50,
        startDelay: 0,
        backSpeed: 0,
        backDelay: 500,
        loop: false,
        loopCount: false,
        showCursor: false,
        onStringTyped: () => {
          this.chatBubble(text, 'me');
          $('#type-write > div').remove();
          this.reply();
        }
    });
  }
}

$(document).ready(function() {
  var chatExample = new ChatEmu();
});
