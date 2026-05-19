import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteLocalGovernmentComponent } from './write-local-government.component';

describe('WriteLocalGovernmentComponent', () => {
  let component: WriteLocalGovernmentComponent;
  let fixture: ComponentFixture<WriteLocalGovernmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteLocalGovernmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteLocalGovernmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
