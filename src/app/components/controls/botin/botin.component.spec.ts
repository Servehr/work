import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotinComponent } from './botin.component';

describe('BotinComponent', () => {
  let component: BotinComponent;
  let fixture: ComponentFixture<BotinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
