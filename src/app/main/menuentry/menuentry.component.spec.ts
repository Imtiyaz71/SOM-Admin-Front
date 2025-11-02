import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuentryComponent } from './menuentry.component';

describe('MenuentryComponent', () => {
  let component: MenuentryComponent;
  let fixture: ComponentFixture<MenuentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuentryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
