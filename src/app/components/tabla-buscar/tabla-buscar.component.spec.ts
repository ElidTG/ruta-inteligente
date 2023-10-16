import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaBuscarComponent } from './tabla-buscar.component';

describe('TablaBuscarComponent', () => {
  let component: TablaBuscarComponent;
  let fixture: ComponentFixture<TablaBuscarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaBuscarComponent]
    });
    fixture = TestBed.createComponent(TablaBuscarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
