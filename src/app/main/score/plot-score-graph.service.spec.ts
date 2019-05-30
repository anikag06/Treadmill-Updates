import { TestBed } from '@angular/core/testing';

import { PlotScoreGraphService } from './plot-score-graph.service';

describe('PlotScoreGraphService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlotScoreGraphService = TestBed.get(PlotScoreGraphService);
    expect(service).toBeTruthy();
  });
});
