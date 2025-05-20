import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
  isEditing?: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: Task[] = [];
  loading = signal(true);
  user = signal<any>(null);

  newTask: Task = {
    title: '',
    description: '',
    deadline: '',
    completed: false
  };

  addTask() {
    if (this.newTask.title.trim()) {
      this.tasks.push({ ...this.newTask, isEditing: false });
      this.newTask = {
        title: '',
        description: '',
        deadline: '',
        completed: false
      };
    }
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }

  editTask(task: Task) {
    task.isEditing = true;
  }

  saveTask(task: Task) {
    task.isEditing = false;
  }
}
