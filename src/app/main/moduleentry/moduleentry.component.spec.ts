import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleentryComponent } from './moduleentry.component';

describe('ModuleentryComponent', () => {
  let component: ModuleentryComponent;
  let fixture: ComponentFixture<ModuleentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleentryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
