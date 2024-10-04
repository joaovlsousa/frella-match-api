import { generateId } from '@helpers/generate-id';

import { Body } from './body';
import { Work } from './work';

describe('Work', () => {
  it('should be able to create a work', () => {
    const work = new Work({
      title: 'Novo projeto',
      description: new Body('Projeto para criação de um site.'),
      amountCharged: 100,
      deliveryTime: new Date(),
      freelancerId: generateId(),
      recruterId: generateId(),
    });

    expect(work).toBeTruthy();
  });
});
