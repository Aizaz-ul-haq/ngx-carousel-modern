import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Renderer2
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselItem, OverlayPosition } from '../../models/carousel-config.interface';

@Component({
  selector: 'lib-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input() items: CarouselItem[] = [];
  @Input() autoPlay: boolean = false;
  @Input() autoPlayInterval: number = 5000;
  @Input() showArrows: boolean = true;
  @Input() showDots: boolean = true;
  @Input() showOverlay: boolean = true;
  @Input() overlayPosition: OverlayPosition = 'center';
  
  // Size configuration inputs
  @Input() maxWidth: string | number = '1400px';
  @Input() slideHeight: string | number = '500px';
  @Input() sideSlideScale: number = 0.75;
  @Input() slideGap: string | number = '8px'; // Gap between slides - control spacing between slides (default: 8px)
  @Input() containerPadding: string | number = '20px';
  
  // Color configuration inputs
  @Input() dotColor: string = '#4A90E2';
  @Input() dotActiveColor: string = '#1E3A8A';
  @Input() slideBackgroundColor: string = 'transparent';

  /**
   * Optional class(es) to apply to the internal `.carousel-container` element.
   * This helps consumers scope CSS overrides without relying on global selectors.
   */
  @Input() containerClass?: string | string[] | Set<string> | { [klass: string]: any };

  /**
   * Optional style overrides merged onto the internal `.carousel-container` element.
   * Useful for setting custom CSS variables from templates.
   */
  @Input() containerStyle?: { [key: string]: string | number };

  /**
   * Optional class(es) added to the host `<lib-carousel>` element (does not replace existing classes).
   * Accepts space-separated class string or string array.
   */
  @Input() hostClass?: string | string[];

  @Output() slideChange = new EventEmitter<number>();

  @ViewChild('carouselWrapper', { static: false }) carouselWrapper!: ElementRef<HTMLDivElement>;
  @ViewChild('carouselContainer', { static: false }) carouselContainer!: ElementRef<HTMLDivElement>;

  // Carousel items array (original + clones)
  carouselItems: CarouselItem[] = [];
  cloneCount = 3;
  currentIndex: number = 0; // Index in carouselItems array
  private autoPlayTimer?: ReturnType<typeof setInterval>;
  isAnimating: boolean = false; // Public for template access
  private smoothTransition: boolean = true;

  // Drag/Swipe properties
  private dragStartX: number = 0;
  private dragCurrentX: number = 0;
  private isDragging: boolean = false;
  private dragThreshold: number = 50;
  private dragOffset: number = 0;

  private previousHostClasses: string[] = [];

  constructor(private readonly renderer: Renderer2, private readonly hostEl: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.applyHostClasses();
    this.setupInfiniteCarousel();
    if (this.autoPlay && this.items.length > 1) {
      this.startAutoPlay();
    }
  }

  ngAfterViewInit(): void {
    // Initial position set instantly (no smooth transition)
    setTimeout(() => {
      this.updateCarousel(false);
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hostClass']) {
      this.applyHostClasses();
    }
    if (changes['items'] && !changes['items'].firstChange) {
      this.setupInfiniteCarousel();
      this.currentIndex = this.cloneCount; // Reset to first original item
      this.updateCarousel(false);
      if (this.autoPlay && this.items.length > 1) {
        this.resetAutoPlay();
      } else {
        this.stopAutoPlay();
      }
    }
    if (changes['autoPlay'] || changes['autoPlayInterval']) {
      if (this.autoPlay && this.items.length > 1) {
        this.resetAutoPlay();
      } else {
        this.stopAutoPlay();
      }
    }
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  /**
   * Setup infinite carousel with clones
   */
  setupInfiniteCarousel(): void {
    if (this.items.length === 0) {
      this.carouselItems = [];
      return;
    }

    this.carouselItems = [];

    // Prepend clones (last items)
    for (let i = 0; i < this.cloneCount; i++) {
      const cloneIndex = this.items.length - this.cloneCount + i;
      this.carouselItems.push(this.items[cloneIndex]);
    }

    // Append original items
    this.carouselItems.push(...this.items);

    // Append clones (first items)
    for (let i = 0; i < this.cloneCount; i++) {
      this.carouselItems.push(this.items[i]);
    }

    // Set currentIndex to first original item
    this.currentIndex = this.cloneCount;
  }

  updateCarousel(smooth: boolean = true): void {
    if (!this.carouselWrapper || !this.carouselContainer || this.carouselItems.length === 0) {
      return;
    }

    this.smoothTransition = smooth;
    this.isAnimating = smooth;

    const wrapper = this.carouselWrapper.nativeElement;
    const container = this.carouselContainer.nativeElement;

    const firstItem = wrapper.querySelector('.carousel-item') as HTMLElement;
    if (!firstItem) return;

    const itemWidth = firstItem.offsetWidth;
    const itemStyle = window.getComputedStyle(firstItem);
    const marginLeft = parseFloat(itemStyle.marginLeft) || this.parseSize(this.slideGap);
    const marginRight = parseFloat(itemStyle.marginRight) || this.parseSize(this.slideGap);
    const itemFullWidth = itemWidth + marginLeft + marginRight;
    
    const containerWidth = container.offsetWidth;
    const currentItemCenter = (this.currentIndex * itemFullWidth) + marginLeft + (itemWidth / 2);
    const translateX = (containerWidth / 2) - currentItemCenter;
    if (!smooth) {
      wrapper.style.transition = 'none';
    } else {
      wrapper.style.transition = 'transform 1.5s cubic-bezier(0.4, 0.0, 0.2, 1)';
    }

    wrapper.style.transform = `translateX(${translateX}px)`;

    if (!smooth) {
      wrapper.offsetWidth;
      wrapper.style.transition = 'transform 1.5s cubic-bezier(0.4, 0.0, 0.2, 1)';
    }

    if (smooth) {
      wrapper.addEventListener('transitionend', this.handleInfiniteJump.bind(this), { once: true });
    }
  }

  handleInfiniteJump(): void {
    const isAtStartClone = this.currentIndex < this.cloneCount;
    const isAtEndClone = this.currentIndex >= this.carouselItems.length - this.cloneCount;

    if (isAtEndClone) {
      const originalIndex = this.currentIndex - (this.carouselItems.length - this.cloneCount);
      this.currentIndex = this.cloneCount + originalIndex;
      this.updateCarousel(false);
    } else if (isAtStartClone) {
      const originalIndex = this.cloneCount - this.currentIndex;
      this.currentIndex = this.carouselItems.length - this.cloneCount - originalIndex;
      this.updateCarousel(false);
    }

    this.isAnimating = false;
    this.emitSlideChange();
  }

  /**
   * Navigate to next slide
   */
  nextSlide(): void {
    if (this.items.length === 0 || this.isAnimating) return;
    this.currentIndex++;
    this.updateCarousel(true);
    this.resetAutoPlay();
  }

  /**
   * Navigate to previous slide
   */
  previousSlide(): void {
    if (this.items.length === 0 || this.isAnimating) return;
    this.currentIndex--;
    this.updateCarousel(true);
    this.resetAutoPlay();
  }

  /**
   * Navigate to specific slide
   */
  goToSlide(index: number): void {
    if (index < 0 || index >= this.items.length || this.isAnimating) return;
    // Map original index to carouselItems index
    this.currentIndex = this.cloneCount + index;
    this.updateCarousel(true);
    this.resetAutoPlay();
  }

  /**
   * Check if item is active
   */
  isItemActive(itemIndex: number): boolean {
    return itemIndex === this.currentIndex;
  }

  /**
   * Get original item index from carouselItems index
   */
  getOriginalIndex(carouselIndex: number): number {
    if (carouselIndex < this.cloneCount) {
      // Start clone
      return this.items.length - this.cloneCount + carouselIndex;
    } else if (carouselIndex >= this.carouselItems.length - this.cloneCount) {
      // End clone
      return carouselIndex - (this.carouselItems.length - this.cloneCount);
    } else {
      // Original item
      return carouselIndex - this.cloneCount;
    }
  }

  /**
   * Check if dot is active
   */
  isActive(dotIndex: number): boolean {
    const originalIndex = this.getOriginalIndex(this.currentIndex);
    return dotIndex === originalIndex;
  }

  /**
   * Start auto-play
   */
  private startAutoPlay(): void {
    this.stopAutoPlay();
    if (this.autoPlay && this.items.length > 1) {
      this.autoPlayTimer = setInterval(() => {
        this.nextSlide();
      }, this.autoPlayInterval);
    }
  }

  /**
   * Stop auto-play
   */
  private stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = undefined;
    }
  }

  /**
   * Reset auto-play timer
   */
  private resetAutoPlay(): void {
    if (this.autoPlay) {
      this.stopAutoPlay();
      this.startAutoPlay();
    }
  }

  /**
   * Emit slide change event
   */
  private emitSlideChange(): void {
    const originalIndex = this.getOriginalIndex(this.currentIndex);
    this.slideChange.emit(originalIndex);
  }

  /**
   * Handle drag start
   */
  onDragStart(event: TouchEvent | MouseEvent): void {
    if (this.items.length <= 1 || this.isAnimating) return;
    
    this.isDragging = true;
    this.dragOffset = 0;
    this.stopAutoPlay();
    
    if (event instanceof TouchEvent) {
      this.dragStartX = event.touches[0].clientX;
    } else {
      this.dragStartX = event.clientX;
      event.preventDefault();
    }
    
    this.dragCurrentX = this.dragStartX;
  }

  /**
   * Handle drag move
   */
  onDragMove(event: TouchEvent | MouseEvent): void {
    if (!this.isDragging || this.items.length <= 1) return;
    
    let currentX: number;
    if (event instanceof TouchEvent) {
      currentX = event.touches[0].clientX;
    } else {
      currentX = event.clientX;
      event.preventDefault();
    }
    
    this.dragCurrentX = currentX;
    this.dragOffset = currentX - this.dragStartX;
    
    // Apply drag transform
    if (this.carouselWrapper) {
      const wrapper = this.carouselWrapper.nativeElement;
      const baseTranslateX = this.calculateBaseTranslateX();
      wrapper.style.transition = 'none';
      wrapper.style.transform = `translateX(${baseTranslateX + this.dragOffset}px)`;
    }
  }

  /**
   * Handle drag end
   */
  onDragEnd(event: TouchEvent | MouseEvent): void {
    if (!this.isDragging || this.items.length <= 1) return;
    
    const dragDistance = this.dragCurrentX - this.dragStartX;
    const absDistance = Math.abs(dragDistance);
    
    if (absDistance > this.dragThreshold) {
      if (dragDistance > 0) {
        this.previousSlide();
      } else {
        this.nextSlide();
      }
    } else {
      // Snap back to current position
      this.updateCarousel();
    }
    
    this.isDragging = false;
    this.dragOffset = 0;
    this.dragStartX = 0;
    this.dragCurrentX = 0;
    
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }

  /**
   * Calculate base translateX (for drag)
   */
  private calculateBaseTranslateX(): number {
    if (!this.carouselWrapper || !this.carouselContainer || this.carouselItems.length === 0) {
      return 0;
    }

    const wrapper = this.carouselWrapper.nativeElement;
    const container = this.carouselContainer.nativeElement;
    const firstItem = wrapper.querySelector('.carousel-item') as HTMLElement;
    if (!firstItem) return 0;

    const itemWidth = firstItem.offsetWidth;
    const itemStyle = window.getComputedStyle(firstItem);
    const marginLeft = parseFloat(itemStyle.marginLeft) || this.parseSize(this.slideGap);
    const marginRight = parseFloat(itemStyle.marginRight) || this.parseSize(this.slideGap);
    const itemFullWidth = itemWidth + marginLeft + marginRight;
    const containerWidth = container.offsetWidth;
    const currentItemCenter = (this.currentIndex * itemFullWidth) + marginLeft + (itemWidth / 2);
    
    return (containerWidth / 2) - currentItemCenter;
  }

  /**
   * Get container styles
   */
  getContainerStyles(): { [key: string]: string } {
    const height = this.parseSize(this.slideHeight);
    const width = height * 1.6; // keep consistent with getSlideStyles
    const horizontalMargin = this.parseSize(this.slideGap);
    const verticalMargin = height * 0.05; // 5% vertical margin
    return {
      'max-width': this.formatSize(this.maxWidth),
      'padding': `0 ${this.formatSize(this.containerPadding)}`,
      // CSS vars used by SCSS for precise positioning/styling
      '--carousel-slide-width': `${width}px`,
      '--carousel-slide-height': `${height}px`,
      '--carousel-slide-margin-x': `${horizontalMargin}px`,
      '--carousel-slide-margin-y': `${verticalMargin}px`,
      '--carousel-side-scale': `${this.sideSlideScale}`,
      '--carousel-slide-bg': this.slideBackgroundColor,
      '--carousel-dot-color': this.dotColor,
      '--carousel-dot-active-color': this.dotActiveColor
    };
  }

  /**
   * Slide styles applied inline to each `.carousel-item`.
   * These are derived from the same sizing inputs as `getContainerStyles()`.
   */
  getSlideStyles(): { [key: string]: string } {
    const height = this.parseSize(this.slideHeight);
    const width = height * 1.6;
    const horizontalMargin = this.parseSize(this.slideGap);
    const verticalMargin = height * 0.05;

    return {
      'width': `${width}px`,
      'min-width': `${width}px`,
      'height': `${height}px`,
      'margin': `${verticalMargin}px ${horizontalMargin}px`
    };
  }

  getMergedContainerStyles(): { [key: string]: string | number } {
    return {
      ...this.getContainerStyles(),
      ...(this.containerStyle ?? {})
    };
  }

  /**
   * Format size value
   */
  formatSize(value: string | number): string {
    if (typeof value === 'number') {
      return `${value}px`;
    }
    return value;
  }

  /**
   * Parse size value to number
   */
  private parseSize(value: string | number): number {
    if (typeof value === 'number') {
      return value;
    }
    return parseFloat(value.replace('px', '')) || 500;
  }

  /**
   * Get overlay position
   */
  getOverlayPosition(item: CarouselItem): OverlayPosition {
    return item.overlayPosition || this.overlayPosition;
  }

  /**
   * Check if dragging
   */
  getIsDragging(): boolean {
    return this.isDragging;
  }

  /**
   * Handle window resize
   */
  onResize(): void {
    this.updateCarousel(false);
  }

  private applyHostClasses(): void {
    // Remove previously applied classes
    for (const cls of this.previousHostClasses) {
      this.renderer.removeClass(this.hostEl.nativeElement, cls);
    }

    // Add new classes
    const next = this.normalizeClassInput(this.hostClass);
    for (const cls of next) {
      this.renderer.addClass(this.hostEl.nativeElement, cls);
    }
    this.previousHostClasses = next;
  }

  private normalizeClassInput(value: string | string[] | undefined): string[] {
    if (!value) return [];
    if (Array.isArray(value)) return value.map(v => `${v}`.trim()).filter(Boolean);
    return `${value}`
      .split(/\s+/g)
      .map(v => v.trim())
      .filter(Boolean);
  }
}
