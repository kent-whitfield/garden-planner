import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedViewComponent } from './seed-view.component';

describe('SeedViewComponent', () => {
  let component: SeedViewComponent;
  let fixture: ComponentFixture<SeedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeedViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
