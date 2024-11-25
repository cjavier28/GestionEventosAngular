import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscribireventoComponent } from './inscribirevento.component';

describe('InscribireventoComponent', () => {
  let component: InscribireventoComponent;
  let fixture: ComponentFixture<InscribireventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscribireventoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscribireventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
