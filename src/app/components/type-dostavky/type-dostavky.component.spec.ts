import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDostavkyComponent } from './type-dostavky.component';

describe('TypeDostavkyComponent', () => {
  let component: TypeDostavkyComponent;
  let fixture: ComponentFixture<TypeDostavkyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeDostavkyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeDostavkyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
