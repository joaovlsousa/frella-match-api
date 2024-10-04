import { Freelancer } from './freelancer';

describe('Freelancer', () => {
  it('should be able to create a freelancer', () => {
    const freelancer = new Freelancer({
      name: 'Jhon Doe',
      email: 'jhondoe@mail.com',
    });

    expect(freelancer).toBeTruthy();
  });
});
