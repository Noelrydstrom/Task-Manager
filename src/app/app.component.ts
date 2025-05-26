import { Component, signal } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { SorterPipe } from './pipe/sort.pipe';
import { SearchPipe } from './pipe/search.pipe';
import { HighlightOverdueDirective } from './directive/highlight-overdue.directive';

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
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SorterPipe,
    SearchPipe,
    HighlightOverdueDirective
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: Task[] = [];
  loading = signal(true);
  user = signal<any>(null);

  sortBy: string = '';
  searchTerm: string = '';

  isTaskPage: boolean = true; // ✅ Initialize here to avoid template error

  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl(''),
    deadline: new FormControl('', Validators.required),
  });

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isTaskPage = event.url === '/' || event.urlAfterRedirects === '/';
      }
    });
  }

  addTask() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        title: this.taskForm.value.title!,
        description: this.taskForm.value.description || '',
        deadline: this.taskForm.value.deadline!,
        completed: false,
        isEditing: false
      };
      this.tasks = [...this.tasks, newTask];
      this.taskForm.reset();
      this.loading.set(false);
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  removeTask(index: number) {
    this.tasks = this.tasks.filter((_, i) => i !== index);
  }

  editTask(task: Task) {
    task.isEditing = true;
  }

  saveTask(task: Task) {
    task.isEditing = false;
  }
}
