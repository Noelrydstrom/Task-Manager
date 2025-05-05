import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: string[] = [];
  newTask: string = '';

  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.newTask = input.value;
  }

  addTask(task: string) {
    if (task.trim()) {
      this.tasks.push(task);
      this.newTask = '';
    }
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }
}
