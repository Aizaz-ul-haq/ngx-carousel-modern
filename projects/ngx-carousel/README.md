# angular-carousel-modern

A modern, configurable carousel for Angular. It ships as a standalone component (for standalone apps) and as an NgModule (for NgModule-based apps). The goal is to give you a great default carousel, while still letting you customize spacing, sizing, and styling without fighting Angular view encapsulation.

- GitHub: https://github.com/Aizaz-ul-haq/ngx-carousel-modern
- Issues: https://github.com/Aizaz-ul-haq/ngx-carousel-modern/issues

## Installation

```bash
npm install angular-carousel-modern
```

Peer dependencies:
- Angular: 16, 17, or 18

## Quick start

### Standalone app usage

```ts
import { Component } from '@angular/core';
import { CarouselComponent, CarouselItem } from 'angular-carousel-modern';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CarouselComponent],
  template: `
    <lib-carousel
      hostClass="my-carousel"
      [items]="items"
      [autoPlay]="true"
      [autoPlayInterval]="5000"
      [showArrows]="true"
      [showDots]="true"
      [showOverlay]="false"
      [maxWidth]="'1400px'"
      [slideHeight]="'400px'"
      [sideSlideScale]="0.9"
      [activeSlideScale]="1.12"
      [slideGap]="'12px'"
      [containerPadding]="'32px'"
      [containerStyle]="{
        '--carousel-slide-radius': '18px',
        '--carousel-nav-bottom': '95px',
        '--carousel-dots-bottom': '88px',
        '--carousel-wrapper-align-items': 'flex-start',
        '--carousel-slide-margin-y': '0px'
      }"
      (slideChange)="onSlideChange($event)"
    ></lib-carousel>
  `
})
export class ExampleComponent {
  items: CarouselItem[] = [
    { imageUrl: 'https://example.com/1.jpg', title: 'Slide 1', description: '...' },
    { imageUrl: 'https://example.com/2.jpg', title: 'Slide 2', description: '...' },
    { imageUrl: 'https://example.com/3.jpg', title: 'Slide 3', description: '...' }
  ];

  onSlideChange(index: number): void {
    console.log('Active slide index:', index);
  }
}
```

### NgModule usage

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgxCarouselModule } from 'angular-carousel-modern';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxCarouselModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## Data model

```ts
export interface CarouselItem {
  imageUrl: string;
  title?: string;
  description?: string;
  overlayPosition?: 'left' | 'center' | 'right';
}
```

## API

### Inputs

Core behavior:
- `items: CarouselItem[]`
- `autoPlay: boolean`
- `autoPlayInterval: number`
- `showArrows: boolean`
- `showDots: boolean`
- `showOverlay: boolean`
- `overlayPosition: 'left' | 'center' | 'right'`

Sizing and spacing:
- `maxWidth: string | number`
- `slideHeight: string | number`
- `slideGap: string | number`
- `containerPadding: string | number`
- `sideSlideScale: number`
- `activeSlideScale: number` (use values > 1 to make the center slide more dominant)

Colors:
- `dotColor: string`
- `dotActiveColor: string`
- `slideBackgroundColor: string`

Styling hooks:
- `hostClass: string | string[]` (adds classes to the `<lib-carousel>` host element)
- `containerClass: string | string[] | Set<string> | { [klass: string]: any }` (applies to the internal `.carousel-container`)
- `containerStyle: { [key: string]: string | number }` (merged into the internal `.carousel-container` styles; great for CSS variables)

### Outputs

- `slideChange: EventEmitter<number>` — emits the active slide index (0-based, relative to your original `items` array).

## Styling and theming

The easiest way to style the carousel is to scope a class with `hostClass`, then use CSS variables (no deep selectors required):

```css
/* styles.css / styles.scss */
lib-carousel.my-carousel {
  --carousel-nav-bg: #E8F0FB;
  --carousel-nav-color: #1967D2;
  --carousel-nav-size: 56px;
  --carousel-nav-bottom: 95px;

  --carousel-dot-color: #dbe7f5;
  --carousel-dot-active-color: #8bb8ff;
  --carousel-dots-bottom: 88px;

  --carousel-slide-radius: 18px;
  --carousel-slide-shadow: 0 18px 45px rgba(0, 0, 0, 0.18);
  --carousel-slide-shadow-active: 0 25px 60px rgba(0, 0, 0, 0.22);

  /* Layout experiments */
  --carousel-wrapper-align-items: flex-start; /* or center */
  --carousel-slide-margin-x: 12px;
  --carousel-slide-margin-y: 0px;
}
```

If you want to target internal classes directly, prefer putting overrides in a global stylesheet. If you do it from a component stylesheet (like `app.component.css`), Angular will scope the selector and it usually won’t reach inside the carousel unless you use `::ng-deep`.

## Contributing

If you’d like to contribute:
- Open an issue first if you want to discuss a change, or if you’re not sure what the right approach is.
- Create a branch, make your changes, and open a Pull Request. A small PR with a clear description is always appreciated.

## Issues and feedback

If something feels off, breaks, or you have ideas for improvements, please open an issue:
- https://github.com/Aizaz-ul-haq/ngx-carousel-modern/issues

When reporting a bug, it helps a lot if you include:
- Angular version
- a short reproduction (or a small repo)
- screenshots or a short screen recording

## License

MIT


