/**
 * Position for the text overlay on carousel slides
 */
export type OverlayPosition = 'left' | 'center' | 'right';

/**
 * Configuration interface for individual carousel items
 */
export interface CarouselItem {
  /** URL of the background image for the slide */
  imageUrl: string;
  /** Title text displayed in the overlay (blue, bold) */
  title?: string;
  /** Description text displayed in the overlay */
  description?: string;
  /** Optional overlay position override for this specific slide */
  overlayPosition?: OverlayPosition;
}

/**
 * Configuration interface for the carousel component
 */
export interface CarouselConfig {
  /** Array of carousel items to display */
  items: CarouselItem[];
  /** Enable auto-play functionality */
  autoPlay?: boolean;
  /** Interval in milliseconds for auto-play (default: 5000) */
  autoPlayInterval?: number;
  /** Show navigation arrows (default: true) */
  showArrows?: boolean;
  /** Show dot indicators (default: true) */
  showDots?: boolean;
  /** Default overlay position for all slides (default: 'center') */
  overlayPosition?: OverlayPosition;
}


