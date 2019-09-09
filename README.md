# Simple JS Carousel

Before you reach out to a carousel, first consider if you really need it. There are plenty of compeling cases to not use a carousel.

Download the script and include it in your html file.

The script expects certain classes to be available by default. For the html, 

```html
<div class="sj-carousel-container">
  <div class="sj-carousel-content">
    <div class="sj-carousel-slide">
    ...
    </div>
    ...
    <div class="sj-carousel-indicators"></div>
    <div class="sj-carousel-indicators"></div>
    ...
    <div class="sj-carousel-next"></div>
    <div class="sj-carousel-prev"></div>
  </div>
</div>
```

add the following script

```js
carousel = new SJCarousel()
```

and the following styles

```css
.sj-carousel-container {
  overflow: hidden;
}
.sj-carousel-content {
  display: flex;
  transition: transform 1s ease;
}
.sj-carousel-slide {
  flex: 0 0 auto;
}
```

## Arguments

The carousel accepts two arguments:

### Container element selector
Optional. The container element for the carousel. It defaults to `.sj-carousel-container`. You can pass a custom selector or even a dom node.

### Options
- `autoScroll` - Boolean to automatically scroll the carousel as soon as it is rendered. Dafaults to `false`
- `visibleCount` - The total number of slides that are visible at a time. Defaults to `1`
- `keyboardListenerOnDoc` - Boolean indicating if the keyboard event listeners should be registered on the document object. Defaults to `false`

## Keyboard navigation

The keyboard listeners are registered on the parent carousel container. To trigger these, the parent container should be in focus. To make a `div` focussable, add attribute `tabindex=0` to the container.

```html
<div class="sj-carousel-container" tabindex=0>
```

For cases, where it might make sense to simply attach the event listener to the document instead of the container, set `keyboardListenerOnDoc` to `true`

## Why another carousel?

Carousels are usually used once on a web page. However, there may be cases where a carousel would have to be removed based on user interactions. It is common to set `display: none` on the container element and call it a day. But, depending on your use case, this might lead to a bunch to event listeners which are never removed and start leaking memory.

Simple JS Carousel provides an easy method to remove all event listeners attached on the carousel. The script also includes support for keyboard navigation.
