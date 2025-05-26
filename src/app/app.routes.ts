import { Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { AboutComponent } from './pages/about/about.component';

export const appRoutes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' }
];
