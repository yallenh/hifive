/* global document, window */
/*
window.addEventListener("orientationchange", function() {
}, false);

window.addEventListener("resize", function() {
}, false);
*/
var DOC = document;
var WIN = window;

function RandomPicker(max, min) {
  this.min = min || 0;
  this.max = max;
  this.elements = [];
  for (var i = this.min; i < this.max; i++) {
    this.elements.push(i);
  }
}
RandomPicker.prototype = {
  pick: function() {
    return this.elements.splice(this.rand(), 1)[0];
  },

  rand: function() {
    return Math.floor(Math.random() * (this.elements.length)) + this.min;
  }
};

function HiFiveDOM(rootNode) {
  try {
    this.container = rootNode || DOC.getElementById('app');
  } catch (e) {
    console.error(e);
  }
  this.image = DOC.createElement('img');
}

HiFiveDOM.prototype = {
  preloadImages: function(images) {
    var count = images && images.length;
    var randomOrderImages = [];
    var randomPicker = new RandomPicker(count);
    for (var i = 0; i < count; i++) {
      this.createImage({
        class: 'img',
        src: images[randomPicker.pick()],
        width: '25%',
        height: '33%'
      });
    }
  },

  createImage: function(attrs) {
    var node = this.image.cloneNode(false);
    Object.keys(attrs).forEach(function(attr) {
      if (attrs.hasOwnProperty(attr)) {
        node.setAttribute(attr, attrs[attr]);
      }
    });
    this.container.appendChild(node);
  },

  showImage: function(n) {
    this.container.children[n].classList.add('show');
  }
};

function HiFive(lifeTime) {
  this.lifeTime = lifeTime || 120;
  this.timer = null;
  this.imageCount = 12;
  var imageDB = [];
  for (var i = 0; i < this.imageCount; i++) {
    imageDB.push('./images/' + i + '.png');
  }
  this.dom = new HiFiveDOM();
  this.dom.preloadImages(imageDB);

  this.randomPicker = new RandomPicker(this.imageCount);

  this.start();
};

HiFive.prototype = {
  start: function() {
    this.stop();
    if (this.imageCount) {
      var interval = this.lifeTime / this.imageCount;
      this.showImage();
      this.timer = setInterval(this.showImage.bind(this), interval * 1000);
    }
  },

  stop: function() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },

  showImage: function() {
    var idx = this.randomPicker.pick();
    if (!isNaN(idx)) {
      this.dom.showImage(idx);
    } else {
      this.stop();
    }
  }
}

document.addEventListener("DOMContentLoaded", function(event) {
  // DOM fully loaded and parsed
  var app = new HiFive(120);
});
