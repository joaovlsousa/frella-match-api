import { makeUser } from '@test/factories/user-factory';

describe('User', () => {
  it('should be able to create a user', () => {
    const freelancer = makeUser();

    expect(freelancer).toBeTruthy();
  });
});
