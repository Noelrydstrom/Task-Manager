import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightOverdue]',
  standalone: true
})
export class HighlightOverdueDirective implements OnInit {
  @Input() appHighlightOverdue!: string;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const today = new Date();
    const deadlineDate = new Date(this.appHighlightOverdue);

    if (deadlineDate < today) {
      this.el.nativeElement.style.backgroundColor = '#ffcccc'; // ljusröd
    }
  }
}
