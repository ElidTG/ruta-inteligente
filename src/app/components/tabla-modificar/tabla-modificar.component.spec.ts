import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaModificarComponent } from './tabla-modificar.component';

describe('TablaModificarComponent', () => {
  let component: TablaModificarComponent;
  let fixture: ComponentFixture<TablaModificarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaModificarComponent]
    });
    fixture = TestBed.createComponent(TablaModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
