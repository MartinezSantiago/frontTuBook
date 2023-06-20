import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemLoansComponent } from './item-loans.component';

describe('ItemLoansComponent', () => {
  let component: ItemLoansComponent;
  let fixture: ComponentFixture<ItemLoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemLoansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
