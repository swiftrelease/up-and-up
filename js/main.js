const debugMode = true;


if(debugMode) {
  var coords = document.createElement("p");
  document.body.appendChild(coords);
  window.onmousemove = function(event) {
    coords.innerText = `${event.clientX}, ${event.clientY}`;
  }
}
