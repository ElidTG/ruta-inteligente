import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamaraRegistroComponent } from './camara-registro.component';

describe('CamaraRegistroComponent', () => {
  let component: CamaraRegistroComponent;
  let fixture: ComponentFixture<CamaraRegistroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CamaraRegistroComponent]
    });
    fixture = TestBed.createComponent(CamaraRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
