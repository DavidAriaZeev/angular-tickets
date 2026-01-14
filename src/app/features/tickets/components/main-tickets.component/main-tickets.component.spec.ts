import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTicketsComponent } from './main-tickets.component';

describe('MainTicketsComponent', () => {
  let component: MainTicketsComponent;
  let fixture: ComponentFixture<MainTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainTicketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainTicketsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
