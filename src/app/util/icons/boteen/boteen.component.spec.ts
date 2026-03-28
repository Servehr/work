import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoteenComponent } from './boteen.component';

describe('BoteenComponent', () => {
  let component: BoteenComponent;
  let fixture: ComponentFixture<BoteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
