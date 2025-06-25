import { Component, signal, OnInit } from '@angular/core';
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

interface Project {
  id: number;
  name: string;
  tasks: Task[];
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
export class AppComponent implements OnInit {
  // Projects
  projects: Project[] = [];
  selectedProjectId: number | null = null;
  newProjectName: string = '';

  // Task state (within project)
  sortBy: string = '';
  searchTerm: string = '';
  isTaskPage: boolean = true;

  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl(''),
    deadline: new FormControl('', Validators.required),
  });

  // Signals
  loading = signal(true);
  user = signal<any>(null);

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isTaskPage = event.url === '/' || event.urlAfterRedirects === '/';
      }
    });
  }

  ngOnInit(): void {
    // Simulate a loading delay on app start
    setTimeout(() => {
      this.loading.set(false);
    }, 1000);
  }

  get selectedProject(): Project | undefined {
    return this.projects.find(p => p.id === this.selectedProjectId);
  }

  addProject() {
    if (!this.newProjectName.trim()) return;

    const newProject: Project = {
      id: Date.now(),
      name: this.newProjectName.trim(),
      tasks: []
    };

    this.projects.push(newProject);
    this.selectedProjectId = newProject.id;
    this.newProjectName = '';
  }

  addTask() {
    if (!this.selectedProject) return;

    this.loading.set(true); // Show loading spinner

    setTimeout(() => {
      if (this.taskForm.valid) {
        const newTask: Task = {
          title: this.taskForm.value.title!,
          description: this.taskForm.value.description || '',
          deadline: this.taskForm.value.deadline!,
          completed: false,
          isEditing: false
        };
        this.selectedProject!.tasks.push(newTask);
        this.taskForm.reset();
      } else {
        this.taskForm.markAllAsTouched();
      }

      this.loading.set(false); // Hide spinner after task is added
    }, 500); // Simulate delay
  }

  removeTask(index: number) {
    if (!this.selectedProject) return;
    this.selectedProject.tasks.splice(index, 1);
  }

  editTask(task: Task) {
    task.isEditing = true;
  }

  saveTask(task: Task) {
    task.isEditing = false;
  }
}
