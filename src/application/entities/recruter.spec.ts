import { Recruter } from './recruter';

describe('Recruter', () => {
  it('should be able to create a recruter', () => {
    const recruter = new Recruter({
      name: 'Jhon Doe',
      email: 'jhondoe@mail.com',
    });

    expect(recruter).toBeTruthy();
  });
});
