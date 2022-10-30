# lit-image-galelry

An attempt to create a re-usable image carousel with `lit`.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](http://www.stackblitz.com/github/LexSwed/lit-image-gallery?terminal=dev)

## Todo

- [ ] Safari on iOS seems to throttle `scrollIntoView` while scrolling (waits until finger is up 🤷)
- [ ] Figure out support for styling `slotted` `<picture><source><img /></picture>`, in Shadow DOM only direct children can be styled
  - Proposed solution is to introduce `<image-gallery-image>` which can accept `<img>` and `<picutre>` without issues because styles will be applied on `:host`
- [ ] Slots for nudge buttons, switching images automatically on clicks
- [ ] Accessibility
- [ ] Many different styling and framework usages examples
