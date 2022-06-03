import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpiViewComponent } from './rpi-view.component';

describe('RpiViewComponent', () => {
  let component: RpiViewComponent;
  let fixture: ComponentFixture<RpiViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RpiViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RpiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
