import { Directive, ElementRef, Input, inject } from '@angular/core';
import { fromEvent, map, merge } from 'rxjs';

@Directive({
  selector: '[tilt]',
  host: {
    '[style.transform]': 'rotate',
  },
})
export class TiltDirective {
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  @Input() tiltDegree = 5;

  rotate = 'rotate(0deg)';

  constructor() {
    const rotate$ = fromEvent<MouseEvent>(
      this.elementRef.nativeElement,
      'mouseenter',
    ).pipe(map((event) => this.getRotationDegree(event)));

    const reset$ = fromEvent(this.elementRef.nativeElement, 'mouseleave').pipe(
      map(() => this.getDefaultRotation()),
    );

    merge(rotate$, reset$).subscribe((rotate) => {
      this.rotate = rotate;
    });
  }

  getRotationDegree(event: MouseEvent) {
    const pos = this.determineDirection(event.pageX);
    return `rotate(${pos === 0 ? `${this.tiltDegree}deg` : `${-this.tiltDegree}deg`})`;
  }

  getDefaultRotation() {
    return 'rotate(0deg)';
  }

  /**
   *
   * returns 0 if entered from left, 1 if entered from right
   */
  determineDirection(pos: number): 0 | 1 {
    const width = this.elementRef.nativeElement.clientWidth;
    const middle =
      this.elementRef.nativeElement.getBoundingClientRect().left + width / 2;
    return pos > middle ? 1 : 0;
  }
}
