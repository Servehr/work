import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopEngagersComponent } from './top-engagers.component';

describe('TopEngagersComponent', () => {
  let component: TopEngagersComponent;
  let fixture: ComponentFixture<TopEngagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopEngagersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopEngagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
