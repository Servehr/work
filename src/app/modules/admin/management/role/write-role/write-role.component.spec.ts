import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteRoleComponent } from './write-role.component';

describe('WriteRoleComponent', () => {
  let component: WriteRoleComponent;
  let fixture: ComponentFixture<WriteRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteRoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
