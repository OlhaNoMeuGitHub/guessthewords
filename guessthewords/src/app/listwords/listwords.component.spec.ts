import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListwordsComponent } from './listwords.component';

describe('ListwordsComponent', () => {
  let component: ListwordsComponent;
  let fixture: ComponentFixture<ListwordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListwordsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListwordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
