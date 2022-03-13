import { AdultMiddleware } from './adult.middleware';

describe('AdultMiddleware', () => {
  it('should be defined', () => {
    expect(new AdultMiddleware()).toBeDefined();
  });
});
