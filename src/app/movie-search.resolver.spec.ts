import { TestBed } from '@angular/core/testing';

import { MovieSearchResolver } from './movie-search.resolver';

describe('MovieSearchResolver', () => {
  let resolver: MovieSearchResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MovieSearchResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
