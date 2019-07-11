import { ContainerRefDirective } from './container-ref.directive';
import { ViewContainerRef } from '@angular/core';

describe('ContainerRefDirective', () => {
  it('should create an instance', () => {
    const directive = new ContainerRefDirective(new ViewContainerRef());
    expect(directive).toBeTruthy();
  });
});
