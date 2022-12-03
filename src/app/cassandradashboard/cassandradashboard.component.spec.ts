import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CassandradashboardComponent } from './cassandradashboard.component';

describe('CassandradashboardComponent', () => {
  let component: CassandradashboardComponent;
  let fixture: ComponentFixture<CassandradashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CassandradashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CassandradashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
