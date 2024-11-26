import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginusuarioComponent } from './loginusuario.component';

describe('LoginusuarioComponent', () => {
  let component: LoginusuarioComponent;
  let fixture: ComponentFixture<LoginusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginusuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
