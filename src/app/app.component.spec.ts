import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add a task', () => {
    component.newTask = 'Test Task';
    component.addTask(component.newTask);
    expect(component.tasks.length).toBe(1);
    expect(component.tasks[0]).toBe('Test Task');
  });

  it('should remove a task', () => {
    component.tasks = ['Task_1', 'Task_2'];
    component.removeTask(0);
    expect(component.tasks.length).toBe(1);
    expect(component.tasks[0]).toBe('Task_2');
  });
});