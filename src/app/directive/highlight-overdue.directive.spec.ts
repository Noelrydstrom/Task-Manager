import { HighlightOverdueDirective } from './highlight-overdue.directive';
import { ElementRef } from '@angular/core';

describe('HighlightOverdueDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = {
      nativeElement: document.createElement('div')
    } as ElementRef;

    const directive = new HighlightOverdueDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
});
