export default (() => {
  class CustomDragElement extends HTMLElement {

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
      return this._movingElement || this.querySelector('.moving-element') || this.shadowRoot.querySelector('.moving-element');
    }

    constructor() {
      super();
      this.attachShadow({mode: 'open'});

      this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          position: absolute;
          user-select: none;
        }
        .moving-element {
          cursor: move;
        }
        ::slotted(.moving-element) {
          cursor: move;
        }
      </style>
      <slot></slot>
      `;

      this.mousedown = this.mousedown.bind(this);
      this.mouseup = this.mouseup.bind(this);
      this.mousemove = this.mousemove.bind(this);
    }
    connectedCallback() {
      this.position = [0, 0, 0, 0];
      if (!this.movingElement) {
        const span = document.createElement('span');
        span.innerHTML = `click to move`;
        span.classList.add('moving-element')
        span.style = `display: flex; flex-direction: row; height: 64px; width: 100%;`;
        this.shadowRoot.insertBefore(span, this.shadowRoot.querySelector('slot[name="content"]'))
      } else {
        this.movingElement.classList.add('moving-element')
      }

      this.movingElement.addEventListener('mousedown', this.mousedown);
    }

    disconnectedCallback() {
      this.header.removeEvenlistener('mousedown', this.mousedown);
      this.removeEventListener('mouseup', this.mouseup);
      this.removeEventListener('mousemove', this.mousemove);
    }

    mousedown({clientX, clientY}) {
      this.position[2] = clientX;
      this.position[3] = clientY;
      document.addEventListener('mouseup', this.mouseup);
      document.addEventListener('mousemove', this.mousemove);
    }

    mouseup() {
      document.removeEventListener('mouseup', this.mouseup);
      document.removeEventListener('mousemove', this.mousemove);
    }

    mousemove({clientX, clientY}) {
      // calculate the new cursor position:
      this.position[0] = this.position[2] - clientX;
      this.position[1] = this.position[3] - clientY;
      this.position[2] = clientX;
      this.position[3] = clientY;

      requestAnimationFrame(() => {
        this.style.top = `${this.offsetTop - this.position[1]}px`;
        this.style.left = `${this.offsetLeft - this.position[0]}px`;
      })
    }
  }
  customElements.define('custom-drag-element', CustomDragElement);
})()
