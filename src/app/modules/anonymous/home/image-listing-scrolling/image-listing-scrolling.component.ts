import { Component, Input } from '@angular/core';

// @Component({
//   selector: 'app-image-listing-scrolling',
//   standalone: true,
//   imports: [],
//   templateUrl: './image-listing-scrolling.component.html',
//   styleUrl: './image-listing-scrolling.component.scss'
// })
// export class ImageListingScrollingComponent {

// }

@Component({
  selector: 'app-image-listing-scrolling',
  standalone: true,
  imports: [],
  template: `
    <div class="marquee-container" [style.--duration]="speed">
      <!-- Double the list to ensure a seamless visual loop -->
      <div class="marquee-track">
        @for (img of images; track $index) {
          <img [src]="img" alt="Marquee item" />
        }
        @for (img of images; track $index) {
          <img [src]="img" alt="Marquee item duplicate" aria-hidden="true" />
        }
      </div>
    </div>
  `,
  styles: [`
    .marquee-container {
      overflow: hidden;
      max-width: 100%;
      display: flex;
      background: #f2f7df;
      padding: 40px 0px 60px 0px;
      user-select: none;
      margin-left: auto;
      margin-right: auto;
      place-items: center;
    }

    .marquee-track {
      display: flex;
      gap: 50px;
      margin: auto;
      /* Animates 50% of the total width (the original group length) */
      animation: scroll var(--duration, 20s) linear infinite;
    }

    /* Pause animation on hover for interactive feel */
    .marquee-container:hover .marquee-track {
      animation-play-state: paused;
    }

    .marquee-track img {
      height: 70px;
      width: auto;
      object-fit: contain;
      border-radius: 8px;
    }

    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(calc(-50% - 10px)); /* Accounts for half of the gap padding */
      }
    }
  `]
})
export class ImageListingScrollingComponent {
  
  @Input() speed: string = '20s'; // Customizable speed (CSS duration)
  
  @Input() images: string[] = [
    'https://picsum.photos/30/30?grayscale',
    'https://picsum.photos/30/30/?blur',
    'https://picsum.photos/30/30.jpg',
    'https://picsum.photos/30/30',
    'https://picsum.photos/id/237/30/30'
  ];

}