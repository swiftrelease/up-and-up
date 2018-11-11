class Character extends GameElement {
  constructor() {
    super(playField);

    this.STATES = {
      IDLE: "idle",
      JUMP: "jump",
      DOUBLEJUMP: "doublejump",
      SHIFT: "shift",
      DIVE: "dive"
    };
    this.state = this.STATES.IDLE;

    this.bottom = ground.level; // 80
    this.left = 100;
    this.height = 60;
    this.width = 20;

    this.innerText = "-_-";

    this.jumpHeight = 60;
    this.jumpTimeouts = [];

    this.addEventListener("jump", this.jump);
  }

  clearTimeouts() {
    for(var t of this.jumpTimeouts) {
      clearTimeout(t);
    }
    return this;
  }

/*
  changeColor(color) {
    this.style.backgroundColor = color;
    return this;
  }

  setTransition(prop, time, additional) {
    this.style.transition = additional ?
                            `${prop} ${time}s ${additional}` :
                            `${prop} ${time}s`;
    return this;
  }
*/

// TODO: IS THIS THE MAGIC NUMBER FUNCTION? >:D
  jump(event) {

    if(this.state === this.STATES.JUMP) {
      // this.doubleJump();
      console.log("Already jumping bro");
      return;
    } else if(this.state !== this.STATES.IDLE) {
      console.log("How are we here? WUT?");
      return;
    }

    // MAGIC
    const expectedTimeoutsPerJump = 122;
    // Keepin' it clean
    if(this.jumpTimeouts.length >= expectedTimeoutsPerJump) {
      for(let i = 0; i < expectedTimeoutsPerJump; i++) {
        this.jumpTimeouts.shift();
      }
    }

    this.state = this.STATES.JUMP;
    this.innerText = "*_*";
    const self = this;
    let timeStep = 5;
    let timeMultiplier = 1.00;

    for(let i = 1; i <= self.jumpHeight; i++) {
      self.jumpTimeouts.push(setTimeout(function() {
//        self.bottom = ground.level + i;
        self.bottom++;
        self.updatePositionBottom();
      }, timeStep * i * timeMultiplier));

      if(i >= 40 && i % 5 === 0) {
        timeMultiplier += 0.05;
      }
    }

    self.jumpTimeouts.push(setTimeout(function() {
//    for(let i = 1; i <= self.jumpHeight; i++) {
      var i = 1;
      var bottomTracker = self.bottom;
      while(bottomTracker-- > ground.level) {
        i++;
        self.jumpTimeouts.push(setTimeout(function() {
//        self.bottom = ground.level + self.jumpHeight - i;
          self.bottom--;
          self.updatePositionBottom();
        }, timeStep * i));
      }
    }, timeStep * self.jumpHeight * 1.5));

    self.jumpTimeouts.push(setTimeout(function() {
      self.state = self.STATES.IDLE;
      self.innerText = "-_-";
    }, timeStep * self.jumpHeight * 2 * 1.3));
  }


  doubleJump() {

    if(this.state === this.STATES.DOUBLEJUMP) {
      console.log("Woah there, not so fast, kiddo");
      return;
    } else if(this.state !== this.STATES.JUMP) {
      console.log("Uh, how did we even get here?");
      return;
    }

    this.clearTimeouts();
    this.state = this.STATES.DOUBLEJUMP;
    this.innerText = "o_o";

  }

}

customElements.define("g-char", Character);
const thom = new Character();
