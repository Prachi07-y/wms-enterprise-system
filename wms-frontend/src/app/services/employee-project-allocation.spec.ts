import { TestBed } from '@angular/core/testing';

import { EmployeeProjectAllocation } from './employee-project-allocation';

describe('EmployeeProjectAllocation', () => {
  let service: EmployeeProjectAllocation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeProjectAllocation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
