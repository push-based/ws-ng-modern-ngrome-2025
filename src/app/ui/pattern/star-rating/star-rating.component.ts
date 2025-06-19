import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Input,
  input,
} from '@angular/core';

const range = 10;
const numStars = 5;

@Component({
  selector: 'ui-star-rating',
  template: `
    <span class="tooltip">
      {{ tooltipText() }}
    </span>
    <div class="stars">
      <span
        *ngFor="let fill of stars()"
        class="star"
        [ngClass]="{
          'star-half': fill === 0,
          'star-empty': fill === -1,
        }"
      >
        ★
      </span>
    </div>
    <div class="rating-value" *ngIf="showRating">{{ rating() }}</div>
  `,
  styleUrls: [
    'star-rating.component.scss',
    '../../component/tooltip/_tooltip.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, NgFor, NgIf],
})
export class StarRatingComponent {
  range = range;
  numStars = numStars;

  stars = computed<number[]>(() => {
    const scaledRating = this.rating() / (this.range / this.numStars);
    const full = Math.floor(scaledRating);
    const half = scaledRating % 1 > 0.5 ? 1 : 0;
    const empty = this.numStars - full - half;
    return new Array(full)
      .fill(1)
      .concat(new Array(half).fill(0))
      .concat(new Array(empty).fill(-1));
  });

  @Input() showRating = false;

  tooltipText = computed(() => `${this.rating()} average rating`);

  rating = input(5);
}
