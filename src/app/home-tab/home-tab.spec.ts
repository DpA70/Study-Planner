import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTab } from './home-tab';

describe('HomeTab', () => {
  let component: HomeTab;
  let fixture: ComponentFixture<HomeTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
