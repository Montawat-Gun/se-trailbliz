import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizeEditComponent } from './organize-edit.component';

describe('OrganizeEditComponent', () => {
  let component: OrganizeEditComponent;
  let fixture: ComponentFixture<OrganizeEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizeEditComponent]
    });
    fixture = TestBed.createComponent(OrganizeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
