window.addEventListener("orientationchange", function() {
  document.getElementById('debug').innerHTML += window.orientation + '.';
}, false);

window.addEventListener("resize", function() {
  document.getElementById('debug').innerHTML += 'resize.';
  console.log('resize');  
}, false);
