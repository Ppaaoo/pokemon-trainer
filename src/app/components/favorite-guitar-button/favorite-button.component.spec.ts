import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteGuitarButtonComponent } from './favorite-button.component';

describe('FavoriteGuitarButtonComponent', () => {
  let component: FavoriteGuitarButtonComponent;
  let fixture: ComponentFixture<FavoriteGuitarButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteGuitarButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteGuitarButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
