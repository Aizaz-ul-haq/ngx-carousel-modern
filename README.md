# angular-carousel-modern

A modern, customizable carousel component for Angular 16+ with support for both standalone and NgModule-based applications.

## Features

- 🎨 **Beautiful Design**: Clean, professional carousel with white text overlays and blue accents
- 🎯 **Flexible Content**: Support for image backgrounds with customizable text overlays
- 🎮 **Navigation Controls**: Circular arrow buttons and dot indicators
- ⚡ **Auto-play**: Configurable auto-play functionality
- 📱 **Responsive**: Fully responsive design that works on all screen sizes
- 🔧 **Customizable**: Extensive SCSS variables for easy theming
- 🚀 **Angular 16+**: Built for modern Angular with standalone component support
- 📦 **TypeScript**: Full TypeScript support with interfaces and types

## Installation

```bash
npm install angular-carousel-modern
```

## Usage

### Standalone Component (Angular 14+)

```typescript
import { Component } from '@angular/core';
import { CarouselComponent, CarouselItem } from 'angular-carousel-modern';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CarouselComponent],
  template: `
    <lib-carousel
      [items]="carouselItems"
      [autoPlay]="true"
      [autoPlayInterval]="5000"
      [showArrows]="true"
      [showDots]="true"
      [overlayPosition]="'center'"
      (slideChange)="onSlideChange($event)"
    ></lib-carousel>
  `
})
export class ExampleComponent {
  carouselItems: CarouselItem[] = [
    {
      imageUrl: 'https://example.com/image1.jpg',
      title: 'Find the Right Tenders Fast',
      description: 'Bid on relevant tenders for your business in one spot.',
      overlayPosition: 'left'
    },
    {
      imageUrl: 'https://example.com/image2.jpg',
      title: 'Discover Darb\'s Services',
      description: 'Explore tools designed to simplify tender management and support smarter business decisions.',
      overlayPosition: 'center'
    },
    {
      imageUrl: 'https://example.com/image3.jpg',
      title: 'Trusted by Businesses Across Qatar',
      description: 'Join thousands of companies that rely on DARB for streamlined tender discovery.',
      overlayPosition: 'right'
    }
  ];

  onSlideChange(index: number): void {
    console.log('Current slide:', index);
  }
}
```

### NgModule-based Application

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxCarouselModule } from 'angular-carousel-modern';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxCarouselModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Then use the component in your template:

```html
<lib-carousel
  [items]="carouselItems"
  [autoPlay]="true"
  [autoPlayInterval]="5000"
  [showArrows]="true"
  [showDots]="true"
  (slideChange)="onSlideChange($event)"
></lib-carousel>
```

## API Reference

### CarouselComponent

#### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `CarouselItem[]` | `[]` | Array of carousel items to display |
| `autoPlay` | `boolean` | `false` | Enable auto-play functionality |
| `autoPlayInterval` | `number` | `5000` | Interval in milliseconds for auto-play |
| `showArrows` | `boolean` | `true` | Show navigation arrow buttons |
| `showDots` | `boolean` | `true` | Show dot indicators |
| `overlayPosition` | `'left' \| 'center' \| 'right'` | `'center'` | Default position for text overlays |
| `hostClass` | `string \| string[]` | `undefined` | Extra class(es) added to the host `<lib-carousel>` element (useful for scoping CSS overrides) |
| `containerClass` | `string \| string[] \| Set<string> \| { [klass: string]: any }` | `undefined` | Class(es) applied to the internal `.carousel-container` element |
| `containerStyle` | `{ [key: string]: string \| number }` | `undefined` | Style map merged onto the internal `.carousel-container` (handy for setting CSS variables) |

#### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `slideChange` | `EventEmitter<number>` | Emitted when the slide changes. Returns the current slide index. |

### CarouselItem Interface

```typescript
interface CarouselItem {
  imageUrl: string;              // URL of the background image
  title: string;                 // Title text (displayed in blue, bold)
  description: string;           // Description text
  overlayPosition?: 'left' | 'center' | 'right';  // Optional overlay position override
}
```

### OverlayPosition Type

```typescript
type OverlayPosition = 'left' | 'center' | 'right';
```

## Styling Customization

### Customizing Styles (recommended)

Use **CSS custom properties** (CSS variables) to theme without relying on deep selectors:

```css
/* Global styles.css / styles.scss */
lib-carousel.my-carousel {
  --carousel-dot-color: #dbe7f5;
  --carousel-dot-active-color: #8bb8ff;
  --carousel-slide-radius: 18px;
  --carousel-nav-bg: rgba(234, 243, 255, 0.95);
  --carousel-nav-color: #2B5AA5;
}
```

Then scope “any CSS override” via a class on the host:

```css
/* Global styles.css / styles.scss */
lib-carousel.my-carousel .carousel-item {
  outline: 2px solid rgba(30, 58, 138, 0.15);
}
```

Note: if you put overrides in an Angular **component stylesheet** (e.g. `app.component.css`), Angular scopes those selectors and they won’t reach inside the library component unless you use `::ng-deep`. In that case:

```css
/* app.component.css */
:host ::ng-deep lib-carousel.my-carousel .carousel-item {
  outline: 2px solid rgba(30, 58, 138, 0.15);
}
```

## Examples

### Basic Usage

```html
<lib-carousel [items]="items"></lib-carousel>
```

### With Auto-play

```html
<lib-carousel
  [items]="items"
  [autoPlay]="true"
  [autoPlayInterval]="3000"
></lib-carousel>
```

### Without Navigation Controls

```html
<lib-carousel
  [items]="items"
  [showArrows]="false"
  [showDots]="false"
></lib-carousel>
```

### Custom Overlay Positions

```typescript
items: CarouselItem[] = [
  {
    imageUrl: 'image1.jpg',
    title: 'Left Positioned',
    description: 'This overlay is on the left',
    overlayPosition: 'left'
  },
  {
    imageUrl: 'image2.jpg',
    title: 'Center Positioned',
    description: 'This overlay is centered',
    overlayPosition: 'center'
  },
  {
    imageUrl: 'image3.jpg',
    title: 'Right Positioned',
    description: 'This overlay is on the right',
    overlayPosition: 'right'
  }
];
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Requirements

- Angular 16.0.0 or higher
- TypeScript 5.0.0 or higher

## Development

### Building the Library

```bash
npm run build:lib
```

### Building for Production

```bash
npm run build:lib:prod
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and feature requests, please use the [GitHub Issues](https://github.com/your-repo/ngx-carousel/issues) page.

