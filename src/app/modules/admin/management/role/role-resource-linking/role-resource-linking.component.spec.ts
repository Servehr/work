import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleResourceLinkingComponent } from './role-resource-linking.component';

describe('RoleResourceLinkingComponent', () => {
  let component: RoleResourceLinkingComponent;
  let fixture: ComponentFixture<RoleResourceLinkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleResourceLinkingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleResourceLinkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
