class GameElement extends HTMLElement {
  constructor(parent) {
    super();

    this.parent = parent;
    this.show();

  }
  show() {
    this.parent.appendChild(this);
  }
  hide() {
    this.parent.removeChild(this);
  }
  updatePositionBottom() {
    this.style.bottom = `${this.bottom}px`;
    return this;
  }
  updatePositionLeft() {
    this.style.left = `${this.left}px`;
    return this;
  }
  updatePosition() {
    return this.updatePositionLeft().updatePositionBottom();
  }
}

customElements.define("g-element", GameElement);


class GameArea extends GameElement {
  constructor() {
    super(document.body);
    this.width = 800;
    this.height = 350;
    this.gamespeed = 5;
    this.addEventListener("start", this.moveAll);
  }

  moveAll(event) {
    var obs = new Obstacle();
    console.log("alright buster, buckle up");
    const self = this;
    for(var obj of this.children) {
      if(obj instanceof Ground ||
         obj instanceof Character ||
         obj.moving === true) continue;

      obj.moving = true;
      //const elapsedTime = obj.fadeIn();
      const step = 1;
      const end = obj.left;
      for(let i = step; i <= end; i++) {
        setTimeout(function() {
          obj.left -= step;
          obj.updatePositionLeft();
        }, self.gamespeed * i);
      }
      setTimeout(function() {
        obj.fadeOut();
      }, (end + 1) * self.gamespeed);
    }
  }

}

customElements.define("g-area", GameArea);
const playField = new GameArea();
