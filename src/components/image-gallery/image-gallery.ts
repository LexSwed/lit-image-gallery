import { LitElement, html } from 'lit'
import { property, query, queryAssignedElements, queryAssignedNodes, state } from 'lit/decorators.js'
import { style } from './style.css'

export class ImageGallery extends LitElement {
  static get styles() {
    return [style]
  }

  @property({ type: Boolean })
  cycle: boolean = false

  @property({ type: Number, reflect: true })
  index: number = 0

  render() {
    return html`<slot part="scroll-container" />`
  }

  private cycleScrollCopyOfIndexPropertyName = '_ig_copyOf_index'

  private inViewObserver: IntersectionObserver
  private cycleObserver: IntersectionObserver

  @query('slot[part="scroll-container"]')
  private scrollContainer!: HTMLSlotElement

  @queryAssignedElements({ flatten: true })
  private slottedImages!: Array<HTMLElement>

  private get actualSlottedImages() {
    const images = this.scrollContainer
      .assignedNodes({ flatten: true })
      .filter((el) => !(this.cycleScrollCopyOfIndexPropertyName in el))

    return images as Array<HTMLElement>
  }

  firstUpdated(): void {
    this.inViewObserver = new IntersectionObserver(this.onVisible, {
      root: this.scrollContainer,
      threshold: 0.5,
    })
    if (this.cycle) {
      this.cycleObserver = new IntersectionObserver(this.onCycleScroll, {
        root: this.scrollContainer,
        threshold: 1,
      })
      this.addCycleScroll()
    }
    this.slottedImages.forEach((el) => {
      this.inViewObserver.observe(el)
    })
    if (this.actualSlottedImages[this.index]) {
      this.actualSlottedImages[this.index].scrollIntoView({
        block: 'nearest',
        inline: 'start',
        behavior: 'auto',
      })
    }
  }

  onVisible: IntersectionObserverCallback = (entries) => {
    const visibleImage = entries.find((el) => el.isIntersecting)?.target
    if (!visibleImage) return

    if (this.cycleScrollCopyOfIndexPropertyName in visibleImage) {
      this.index = visibleImage[this.cycleScrollCopyOfIndexPropertyName] as number
    } else {
      this.index = this.actualSlottedImages.indexOf(visibleImage as HTMLElement)
    }

    const change = new CustomEvent('change', {
      detail: this.index,
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(change)
  }

  private onCycleScroll: IntersectionObserverCallback = (entries) => {
    const visibleImage = entries.find((el) => el.isIntersecting)?.target
    if (!visibleImage || !(this.cycleScrollCopyOfIndexPropertyName in visibleImage)) return

    const actualImageToShow = this.actualSlottedImages[visibleImage[this.cycleScrollCopyOfIndexPropertyName]]
    if (actualImageToShow) {
      actualImageToShow.scrollIntoView({
        block: 'nearest',
        inline: 'start',
        behavior: 'auto',
      })
    }
  }

  /**
   * Adds images copies to the start and the end of the list to fake cycle scroll.
   * When fake last image (scrolling left from the first image) is shown completely,
   * scroll to the actual last image.
   * When fake first image (scrolling right from the last image) is shown completely,
   * scroll to the actual first image.
   * Assigns internal property 'cycleScrollCopyOfIndexPropertyName' pointing to copied index
   * to distinguish the images from the real ones.
   */
  private addCycleScroll() {
    const images = this.actualSlottedImages
    const imagesSlot = images[0].parentElement
    const firstImageCopy = images[0].cloneNode(true)
    const lastImageCopy = images[images.length - 1].cloneNode(true)

    firstImageCopy[this.cycleScrollCopyOfIndexPropertyName] = 0
    lastImageCopy[this.cycleScrollCopyOfIndexPropertyName] = images.length - 1

    imagesSlot.prepend(lastImageCopy)
    imagesSlot.append(firstImageCopy)

    this.cycleObserver.observe(firstImageCopy as HTMLElement)
    this.cycleObserver.observe(lastImageCopy as HTMLElement)
  }
}
