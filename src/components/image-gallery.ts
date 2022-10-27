import { LitElement, html, css } from 'lit'

const tagName = 'image-gallery'

export class ImageGallery extends LitElement {
  static styles = css`
    :host {
      --gap: var(--gap, 0);
    }

    :host::part(scroll-container) {
      width: 100%;
      display: grid;
      grid-auto-columns: 100%;
      grid-auto-flow: column;
      gap: var(--gap);
      align-items: center;
      overflow-x: auto;
      overscroll-behavior-x: contain;
      scroll-snap-type: x mandatory;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      scrollbar-width: none;
      scroll-padding-inline: var(--gap);
      padding-inline: var(--gap);
    }

    :host::part(scroll-container)::-webkit-scrollbar {
      display: none;
    }

    ::slotted(*) {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      object-fit: cover;
      scroll-snap-type: x mandatory;
      scroll-snap-align: start;
      scroll-snap-stop: always;
    }
  `

  render() {
    return html`<slot part="scroll-container" />`
  }
}

customElements.define(tagName, ImageGallery)
