import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListargestioneventosComponent } from './listargestioneventos.component';

describe('ListargestioneventosComponent', () => {
  let component: ListargestioneventosComponent;
  let fixture: ComponentFixture<ListargestioneventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListargestioneventosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListargestioneventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
