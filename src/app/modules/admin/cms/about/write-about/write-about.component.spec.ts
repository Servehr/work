import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteAboutComponent } from './write-about.component';

describe('WriteAboutComponent', () => {
  let component: WriteAboutComponent;
  let fixture: ComponentFixture<WriteAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteAboutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
