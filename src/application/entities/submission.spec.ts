import { makeSubmission } from '@test/factories/submission-factory';

describe('Submission', () => {
  it('should be able to create a submission', () => {
    const submission = makeSubmission();

    expect(submission).toBeTruthy();
  });
});
