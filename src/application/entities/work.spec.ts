import { makeWork } from '@test/factories/work-factory';

describe('Work', () => {
  it('should be able to create a work', () => {
    const work = makeWork();

    expect(work).toBeTruthy();
  });
});
