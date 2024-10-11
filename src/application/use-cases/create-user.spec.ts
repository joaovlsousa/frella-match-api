import { makeUser } from '@test/factories/user-factory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';

import { CreateUser } from './create-user';

describe('Create user', () => {
  it('should be able to create a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(usersRepository);

    const { user } = await createUser.execute(makeUser());

    expect(usersRepository.users).toHaveLength(1);
    expect(usersRepository.users[0]).toEqual(user);
  });
});
