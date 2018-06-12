import CustomDragMixin from '../custom-drag-mixin.js';

class CustomExample extends CustomDragMixin(HTMLElement) {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: absolute;
          display: flex;
          flex-direction: column;
          height: 320px;
          width: 240px;
        }
        header {
          height: 64px;
          width: 100%;
          background: #222;
          color: #fff;
        }
      </style>
      <header class="moving-element">
        Click & Drag
      </header>
      <slot></slot>
    `
  }
  connectedCallback() {
    super.connectedCallback()
  }
}
customElements.define('custom-example', CustomExample);
