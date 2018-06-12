import CustomDragMixin from './custom-drag-mixin.js';

export default (() => {
  class CustomDragElement extends CustomDragMixin(HTMLElement) {

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
        ::slotted(.moving-element) {
          cursor: move;
        }
      </style>
      <slot></slot>
      `;
    }
    connectedCallback() {
      if (super.connectedCallback) super.connectedCallback();
    }

    disconnectedCallback() {
      if (super.disconnectedCallback) super.disconnectedCallback();
    }
  }
  customElements.define('custom-drag-element', CustomDragElement);
})()
