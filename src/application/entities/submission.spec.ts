import { generateId } from '@helpers/generate-id';

import { Body } from './body';
import { Submission } from './submission';

describe('Submission', () => {
  it('should be able to create a submission', () => {
    const submission = new Submission({
      body: new Body('Gostaria dar minha contribuição com este projeto'),
      amountCharged: 100,
      deliveryTime: new Date(),
      freelancerId: generateId(),
      workId: generateId(),
    });

    expect(submission).toBeTruthy();
  });
});
