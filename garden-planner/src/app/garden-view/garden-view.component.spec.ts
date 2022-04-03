import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenViewComponent } from './garden-view.component';

describe('GardenViewComponent', () => {
  let component: GardenViewComponent;
  let fixture: ComponentFixture<GardenViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GardenViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GardenViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
