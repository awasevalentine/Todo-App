import { TestBed } from '@angular/core/testing';

import { TodosDataService } from './todos-data.service';

describe('TodosDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodosDataService = TestBed.get(TodosDataService);
    expect(service).toBeTruthy();
  });
});
