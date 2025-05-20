import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add a task', () => {
    component.newTask = { 
      title: 'Test Task', 
      description: 'Test Description', 
      deadline: '2025-12-31',
      completed: false  // Tillagd
    };
    component.addTask();

    expect(component.tasks.length).toBe(1);
    expect(component.tasks[0]).toEqual({
      title: 'Test Task',
      description: 'Test Description',
      deadline: '2025-12-31',
      completed: false,  // Tillagd
      isEditing: false
    });
  });

  it('should remove a task', () => {
    component.tasks = [
      { 
        title: 'Task 1', 
        description: 'Desc 1', 
        deadline: '2025-12-01',
        completed: false,  // Tillagd
        isEditing: false 
      },
      { 
        title: 'Task 2', 
        description: 'Desc 2', 
        deadline: '2025-12-02',
        completed: false,  // Tillagd
        isEditing: false 
      }
    ];

    component.removeTask(0);
    expect(component.tasks.length).toBe(1);
    expect(component.tasks[0].title).toBe('Task 2');
  });
});