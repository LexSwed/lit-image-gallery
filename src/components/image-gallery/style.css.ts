import { css } from 'lit'

export const style = css`
  :host {
    --gap: var(--ig-gap, 0);
  }

  :host::part(scroll-container) {
    --gap: var(--ig-gap, 0);
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
    isolation: isolate;
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
