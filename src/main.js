window.addEventListener("orientationchange", function() {
}, false);

window.addEventListener("resize", function() {
}, false);

var DOC = document;
var WIN = window;

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
    images.forEach(function(image) {
      this.createImage({
        class: 'img',
        src: image,
        width: '25%',
        height: '33%'
      });
    }.bind(this));
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
  this.imageIdx = [];
  var imageDB = [];
  for (var i = 0; i < this.imageCount; i++) {
    this.imageIdx.push(i);
    imageDB.push('./images/' + i + '.png');
  }
  this.dom = new HiFiveDOM();
  this.dom.preloadImages(imageDB);

  this.start();
};

HiFive.prototype = {
  start: function() {
    this.stop();
    if (this.imageCount) {
      var interval = this.lifeTime / this.imageCount;
      this.timer = setInterval(this.showImage.bind(this), interval * 1000);
    }
  },

  stop: function() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },

  showImage: function() {
    var imageIdx = this.imageIdx;
    var imageNode;
    var remainImageCount = imageIdx.length;
    var src;
    if (remainImageCount) {
      var n = this.rand(remainImageCount);
      this.dom.showImage(imageIdx[n]);
      imageIdx.splice(n, 1);
    } else {
      this.stop();
    }
  },

  rand(max, min) {
    min = min || 0;
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

document.addEventListener("DOMContentLoaded", function(event) {
  // DOM fully loaded and parsed
  var app = new HiFive(12);
});
