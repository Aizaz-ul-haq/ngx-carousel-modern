import { Component } from '@angular/core';
import { CarouselItem } from '../../../ngx-carousel/src/lib/models/carousel-config.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ngx Carousel Demo';

  carouselItems: CarouselItem[] = [
    // Figma demo set (3 slides)
    {
      imageUrl: 'assets/slide1.jpeg',
      title: 'Find the Right Tenders Fast',
      description: 'Bid on relevant tenders for your business in one spot.'
    },
    {
      imageUrl: 'assets/slide2.jpeg',
      title: "Discover Darb's Services",
      description: 'Explore tools designed to simplify tender management and support smarter business decisions.'
    },
    {
      imageUrl: 'assets/slide3.jpeg',
      title: 'Trusted by Businesses Across Qatar',
      description: 'Join thousands of companies that rely on DARB for streamlined tender discovery.'
    },
    {
      imageUrl: 'assets/slide2.jpeg',
      title: "Discover Darb's Services",
      description: 'Explore tools designed to simplify tender management and support smarter business decisions.'
    },
    {
      imageUrl: 'assets/slide1.jpeg',
      title: 'Find the Right Tenders Fast',
      description: 'Bid on relevant tenders for your business in one spot.'
    },
  ];

  onSlideChange(index: number): void {
    console.log('Slide changed to index:', index);
  }
}

