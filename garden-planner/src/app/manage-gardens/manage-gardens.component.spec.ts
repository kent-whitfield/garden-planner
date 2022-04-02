import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGardensComponent } from './manage-gardens.component';

describe('ManageGardensComponent', () => {
  let component: ManageGardensComponent;
  let fixture: ComponentFixture<ManageGardensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageGardensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGardensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
