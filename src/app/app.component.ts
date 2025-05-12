import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  title: string;
  description: string;
  deadline: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: any[] = [];

  newTask = {
    title: '',
    description: '',
    deadline: ''
  };

  addTask() {
    if (this.newTask.title.trim()) {
      this.tasks.push({ ...this.newTask, isEditing: false });

      // Clear input fields
      this.newTask = { title: '', description: '', deadline: '' };
    }
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }

  editTask(task: any) {
    task.isEditing = true;
  }

  saveTask(task: any) {
    task.isEditing = false;
  }
}
