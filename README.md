# custom-drag-drop

## examples
### custom-drag-mixin
#### Show header & move element
```html
<custom-example></custom-example>

<script type='module'>
  import CustomDragMixin from '../custom-drag-drop/custom-drag-mixin';
  
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
      `;
    }
  }
  customElements.define('custom-example', CustomExample);
</script>
```
#### Show header & move parent element
```html
<custom-parent></custom-parent>

<script type='module'>
  import CustomDragMixin from '../custom-drag-drop/custom-drag-mixin';
  class CustomParent extends HTMLElement {
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
        <custom-child>
          <slot></slot>
        </custom-child>
      `;
    }
  }
  
  class CustomChild extends CustomDragMixin(HTMLElement) {
    constructor() {
      super();
      this.attachShadow({mode: 'open'});
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: flex;
            flex-direction: column;
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
      `;
    }
    moveElement(top, left) {
      top = `${this.parentNode.host.offsetTop - top}px`;
      left = `${this.parentNode.host.offsetLeft - left}px`;

      this.parentNode.host.style.position = 'absolute';
      this.parentNode.host.style.top = top;
      this.parentNode.host.style.left = left;
    }
  }
  
  customElements.define('custom-child', CustomChild);
  customElements.define('custom-parent', CustomParent);
</script>
```
