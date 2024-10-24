import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentAddedDialogComponent } from './incident-added-dialog.component';

describe('IncidentAddedDialogComponent', () => {
  let component: IncidentAddedDialogComponent;
  let fixture: ComponentFixture<IncidentAddedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentAddedDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidentAddedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
