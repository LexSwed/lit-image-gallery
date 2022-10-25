import { LitElement, html, css } from 'lit'

const tagName = 'image-gallery'

export class ImageGallery extends LitElement {
  static styles = css`
    :host {
    }

    [part='scroll-container'] {
      width: 400px;
      aspect-ratio: 3/2;
      display: grid;
      grid-auto-columns: 100%;
      grid-auto-flow: column;
      align-items: center;
      overflow-x: auto;
      overscroll-behavior-x: contain;
      scroll-snap-type: x mandatory;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      scrollbar-width: none;
    }

    [part='scroll-container']::-webkit-scrollbar {
      display: none;
    }

    ::slotted(*) {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      overscroll-behavior-x: contain;
      scroll-snap-type: x mandatory;
      scroll-snap-align: start;
      scroll-snap-stop: always;
    }
  `

  render() {
    return html`<div><slot part="scroll-container" /></div>`
  }
}

customElements.define(tagName, ImageGallery)
