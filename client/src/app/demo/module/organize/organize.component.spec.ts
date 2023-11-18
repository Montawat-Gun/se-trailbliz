import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizeComponent } from './organize.component';

describe('OrganizeComponent', () => {
  let component: OrganizeComponent;
  let fixture: ComponentFixture<OrganizeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizeComponent]
    });
    fixture = TestBed.createComponent(OrganizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
