import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizeDetailComponent } from './organize-detail.component';

describe('OrganizeDetailComponent', () => {
  let component: OrganizeDetailComponent;
  let fixture: ComponentFixture<OrganizeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizeDetailComponent]
    });
    fixture = TestBed.createComponent(OrganizeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
