import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <h2>About This App</h2>
    <p>This is a task manager made with Angular.</p>
  `,
  styles: [
    `
      h2 {
        color:rgb(113, 28, 136);
        font-size: 6rem;
        margin-bottom: 0.5em;
      }
      p {
        color: #555;
        font-size: 4.1rem;
      }
    `
  ]
})
export class AboutComponent {}
