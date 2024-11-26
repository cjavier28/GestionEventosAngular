import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalgeneralComponent } from './modalgeneral.component';

describe('ModalgeneralComponent', () => {
  let component: ModalgeneralComponent;
  let fixture: ComponentFixture<ModalgeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalgeneralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalgeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
