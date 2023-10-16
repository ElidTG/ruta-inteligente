import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaExportarComponent } from './tabla-exportar.component';

describe('TablaExportarComponent', () => {
  let component: TablaExportarComponent;
  let fixture: ComponentFixture<TablaExportarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaExportarComponent]
    });
    fixture = TestBed.createComponent(TablaExportarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
