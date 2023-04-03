import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesCabinetComponent } from './favorites-cabinet.component';

describe('FavoritesCabinetComponent', () => {
  let component: FavoritesCabinetComponent;
  let fixture: ComponentFixture<FavoritesCabinetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritesCabinetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
