# Quick Start Guide - Using angular-carousel-modern

## Installation

```bash
npm install angular-carousel-modern
```

## Usage

### Option 1: Standalone Component (Angular 14+)

**1. In your component TypeScript file:**

```typescript
import { Component } from '@angular/core';
import { CarouselComponent, CarouselItem } from 'angular-carousel-modern';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [CarouselComponent], // Import the component
  templateUrl: './my-component.component.html'
})
export class MyComponent {
  // Define your carousel items
  carouselItems: CarouselItem[] = [
    {
      imageUrl: 'https://example.com/image1.jpg',
      title: 'Slide 1',
      description: 'Description for slide 1',
      overlayPosition: 'center'
    },
    {
      imageUrl: 'https://example.com/image2.jpg',
      title: 'Slide 2',
      description: 'Description for slide 2',
      overlayPosition: 'center'
    },
    {
      imageUrl: 'https://example.com/image3.jpg',
      title: 'Slide 3',
      description: 'Description for slide 3',
      overlayPosition: 'center'
    }
  ];

  onSlideChange(index: number): void {
    console.log('Current slide:', index);
  }
}
```

**2. In your component HTML template:**

```html
<lib-carousel
  [items]="carouselItems"
  [autoPlay]="true"
  [autoPlayInterval]="5000"
  [showArrows]="true"
  [showDots]="true"
  [showOverlay]="true"
  [maxWidth]="'1200px'"
  [slideHeight]="'400px'"
  [sideSlideScale]="0.7"
  [slideGap]="'12px'"
  [dotColor]="'#CCCCCC'"
  [dotActiveColor]="'#808080'"
  (slideChange)="onSlideChange($event)"
></lib-carousel>
```

### Option 2: NgModule-based Application

**1. In your `app.module.ts` (or feature module):**

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxCarouselModule } from 'angular-carousel-modern';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxCarouselModule  // Add the module here
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**2. In your component TypeScript file:**

```typescript
import { Component } from '@angular/core';
import { CarouselItem } from 'angular-carousel-modern';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  carouselItems: CarouselItem[] = [
    {
      imageUrl: 'https://example.com/image1.jpg',
      title: 'Slide 1',
      description: 'Description for slide 1'
    },
    {
      imageUrl: 'https://example.com/image2.jpg',
      title: 'Slide 2',
      description: 'Description for slide 2'
    }
  ];

  onSlideChange(index: number): void {
    console.log('Current slide:', index);
  }
}
```

**3. In your component HTML template:**

```html
<lib-carousel
  [items]="carouselItems"
  [autoPlay]="true"
  [showArrows]="true"
  [showDots]="true"
  (slideChange)="onSlideChange($event)"
></lib-carousel>
```

## Common Configuration Options

### Basic Usage (Images Only)
```html
<lib-carousel
  [items]="carouselItems"
  [showOverlay]="false"
></lib-carousel>
```

### Custom Sizing
```html
<lib-carousel
  [items]="carouselItems"
  [maxWidth]="'1400px'"
  [slideHeight]="'500px'"
  [sideSlideScale]="0.8"
  [slideGap]="'20px'"
></lib-carousel>
```

### Custom Dot Colors
```html
<lib-carousel
  [items]="carouselItems"
  [dotColor]="'#FF0000'"
  [dotActiveColor]="'#00FF00'"
></lib-carousel>
```

## CarouselItem Interface

```typescript
interface CarouselItem {
  imageUrl: string;              // Required: URL to the image
  title?: string;                // Optional: Title text
  description?: string;          // Optional: Description text
  overlayPosition?: 'left' | 'center' | 'right';  // Optional: Position of overlay
}
```

## All Available Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `items` | `CarouselItem[]` | `[]` | Array of carousel items |
| `autoPlay` | `boolean` | `false` | Enable auto-play |
| `autoPlayInterval` | `number` | `5000` | Auto-play interval (ms) |
| `showArrows` | `boolean` | `true` | Show navigation arrows |
| `showDots` | `boolean` | `true` | Show dot indicators |
| `showOverlay` | `boolean` | `true` | Show text overlays |
| `maxWidth` | `string` | `'100%'` | Maximum width of carousel |
| `slideHeight` | `string` | `'400px'` | Height of slides |
| `sideSlideScale` | `number` | `0.7` | Scale of side slides (0-1) |
| `slideGap` | `string` | `'12px'` | Gap between slides |
| `containerPadding` | `string` | `'16px'` | Padding around carousel |
| `dotColor` | `string` | `'#CCCCCC'` | Color of inactive dots |
| `dotActiveColor` | `string` | `'#808080'` | Color of active dot |
| `slideBackgroundColor` | `string` | `'transparent'` | Background color of slides |

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `slideChange` | `EventEmitter<number>` | Emitted when slide changes, provides current slide index |

## Features

✅ **Drag & Swipe** - Works on both desktop (mouse) and mobile (touch)  
✅ **Responsive** - Automatically adapts to mobile screens  
✅ **Customizable** - Extensive styling options via inputs  
✅ **Auto-play** - Optional automatic slide progression  
✅ **Accessible** - ARIA labels and keyboard navigation support  




