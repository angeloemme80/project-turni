import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotaliComponent } from './totali.component';

describe('TotaliComponent', () => {
  let component: TotaliComponent;
  let fixture: ComponentFixture<TotaliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotaliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
