class Obstacle extends GameElement {
  constructor() {
    super(playField);

    this.bottom = ground.level;
    this.width = 20;
    //this.style.width = "1px";
    this.fadeWidth = 20;
    this.height = 20;
    this.left = playField.width - this.width;
    this.right = 0;
    this.moving = false;
  }

  fadeIn() {
    let elapsedTime = 0;
    const self = this;
    const end = this.width;
    for(let i = 1; i < this.width; i++) {
      setTimeout(function() {
        self.style.width = `${++self.fadeWidth}px`;
        
        self.updatePositionLeft();
      }, playField.gamespeed * i);
      elapsedTime += playField.gamespeed * i;
    }
    return elapsedTime;
  }

  fadeOut() {
    const self = this;
    const end = this.width;
    for(let i = 1; i < this.width; i++) {
      setTimeout(function() {
        self.style.width = `${--self.fadeWidth}px`;
      }, playField.gamespeed * i);
    }
    setTimeout(function() {
      self.hide();
    }, playField.gamespeed * end);
  }

}
customElements.define("g-obs", Obstacle);
//var obs = new Obstacle();
