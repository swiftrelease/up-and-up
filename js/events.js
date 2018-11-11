window.onkeydown = function(event) {
  switch(event.key) {
      case "ArrowUp":
      case "w":
      case "W":
      case " ":
        thom.dispatchEvent(new Event("jump"));
        break;

      case "Enter":
        playField.dispatchEvent(new Event("start"));
        break;
  }
};

window.onresize = function(event) {
  playField.dispatchEvent(new Event("resize"));
}
