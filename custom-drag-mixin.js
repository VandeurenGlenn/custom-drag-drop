export default base => class CustomDragMixin extends base {

  set movingElement(value) {
    if (value === string) {
      value = this.querySelector(value);
    }
    this._movingElement = value;
  }

  get movingElement() {
    if (this.hasAttribute('moving-element') && !this.movingElement) {
      this.movingElement = this.getAttribute('moving-element');
    }
    return this.querySelector('.moving-element') || this.shadowRoot.querySelector('.moving-element');
  }

  constructor() {
    super();

    this.mousedown = this.mousedown.bind(this);
    this.mouseup = this.mouseup.bind(this);
    this.mousemove = this.mousemove.bind(this);
  }
  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this.position = [0, 0, 0, 0];
    if (!this.movingElement) return console.warn(`No .moving-element class found for ${this.localName}`);

    this.movingElement.addEventListener('mousedown', this.mousedown);
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();
    this.movingElement.removeEventListener('mousedown', this.mousedown);
    this.removeEventListener('mouseup', this.mouseup);
    this.removeEventListener('mousemove', this.mousemove);
  }

  mousedown({clientX, clientY}) {
    this.moving = true;
    this.position[2] = clientX;
    this.position[3] = clientY;
    document.addEventListener('mouseup', this.mouseup);
    document.addEventListener('mousemove', this.mousemove);
  }

  mouseup() {
    this.moving = false;
    document.removeEventListener('mouseup', this.mouseup);
    document.removeEventListener('mousemove', this.mousemove);
  }

  mousemove({clientX, clientY}) {
    // calculate the new cursor position:
    this.position[0] = this.position[2] - clientX;
    this.position[1] = this.position[3] - clientY;
    this.position[2] = clientX;
    this.position[3] = clientY;

    this.moveElement(this.position[1], this.position[0]);
  }

  moveElement(top, left) {
    top = `${this.offsetTop - top}px`;
    left = `${this.offsetLeft - left}px`;

    requestAnimationFrame(() => {
      this.style.top = top;
      this.style.left = left;
    })
  }
}
