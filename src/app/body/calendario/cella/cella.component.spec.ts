import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellaComponent } from './cella.component';

describe('CellaComponent', () => {
  let component: CellaComponent;
  let fixture: ComponentFixture<CellaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
