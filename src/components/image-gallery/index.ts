export { ImageGallery } from './image-gallery'
import { ImageGallery } from './image-gallery'

customElements.define('image-gallery', ImageGallery)

declare global {
  interface HTMLElementTagNameMap {
    'image-gallery': ImageGallery
  }
  namespace JSX {
    interface IntrinsicElements {
      'image-gallery': any
    }
  }
}
