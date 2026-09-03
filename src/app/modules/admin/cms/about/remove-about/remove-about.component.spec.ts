import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAboutComponent } from './remove-about.component';

describe('RemoveAboutComponent', () => {
  let component: RemoveAboutComponent;
  let fixture: ComponentFixture<RemoveAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveAboutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
