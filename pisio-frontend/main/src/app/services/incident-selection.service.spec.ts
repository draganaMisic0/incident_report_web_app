import { TestBed } from '@angular/core/testing';

import { IncidentSelectionService } from './incident-selection.service';

describe('IncidentSelectionService', () => {
  let service: IncidentSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncidentSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
