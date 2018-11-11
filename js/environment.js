class Ground extends GameElement {
  constructor() {
    super(playField);
    this.level = 80;
  }
}

customElements.define("g-ground", Ground);
const ground = new Ground();
