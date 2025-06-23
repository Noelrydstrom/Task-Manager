import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing'; // Added import

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        FormsModule,
        RouterTestingModule // Added to fix ActivatedRoute error
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add a task', () => {
    component.projects = [{
      id: 1,
      name: 'Test Project',
      tasks: []
    }];
    component.selectedProjectId = 1;

    component.taskForm.controls['title'].setValue('Test Task');
    component.taskForm.controls['description'].setValue('Test Description');
    component.taskForm.controls['deadline'].setValue('2025-12-31');

    component.addTask();

    const selectedProject = component.selectedProject;
    expect(selectedProject?.tasks.length).toBe(1);
    expect(selectedProject?.tasks[0]).toEqual({
      title: 'Test Task',
      description: 'Test Description',
      deadline: '2025-12-31',
      completed: false,
      isEditing: false
    });
  });

  it('should remove a task', () => {
    const testProject = {
      id: 1,
      name: 'Test Project',
      tasks: [
        { 
          title: 'Task 1', 
          description: 'Desc 1', 
          deadline: '2025-12-01',
          completed: false,
          isEditing: false 
        },
        { 
          title: 'Task 2', 
          description: 'Desc 2', 
          deadline: '2025-12-02',
          completed: false,
          isEditing: false 
        }
      ]
    };
    
    component.projects = [testProject];
    component.selectedProjectId = testProject.id;

    component.removeTask(0);
    
    const selectedProject = component.selectedProject;
    expect(selectedProject?.tasks.length).toBe(1);
    expect(selectedProject?.tasks[0].title).toBe('Task 2');
  });
});