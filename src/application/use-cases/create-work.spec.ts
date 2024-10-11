import { makeUser } from '@test/factories/user-factory';
import { makeWork } from '@test/factories/work-factory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { InMemoryWorksRepository } from '@test/repositories/in-memory-works-repository';

import { CreateUser } from './create-user';
import { CreateWork } from './create-work';

describe('Create work', () => {
  it('should be able to create a work', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const worksRepository = new InMemoryWorksRepository();

    const createUser = new CreateUser(usersRepository);
    const createWork = new CreateWork(worksRepository, usersRepository);

    const { user } = await createUser.execute(
      makeUser({
        role: 'RECRUITER',
      }),
    );

    const body = makeWork({
      recruiterId: user.id,
    });

    const { work } = await createWork.execute({
      title: body.title,
      description: body.description.value,
      amountCharged: body.amountCharged,
      endsAt: body.endsAt.value,
      recruiterId: body.recruiterId,
    });

    expect(worksRepository.works).toHaveLength(1);
    expect(worksRepository.works[0]).toEqual(work);
  });

  it('should not be able to create a work because user not found', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const worksRepository = new InMemoryWorksRepository();

    const createWork = new CreateWork(worksRepository, usersRepository);

    const body = makeWork();

    await expect(
      createWork.execute({
        title: body.title,
        description: body.description.value,
        amountCharged: body.amountCharged,
        endsAt: body.endsAt.value,
        recruiterId: body.recruiterId,
      }),
    ).rejects.toThrow();

    expect(worksRepository.works).toHaveLength(0);
  });

  it('should not be able to create a work because user is a freelancer', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const worksRepository = new InMemoryWorksRepository();

    const createUser = new CreateUser(usersRepository);
    const createWork = new CreateWork(worksRepository, usersRepository);

    const { user } = await createUser.execute(
      makeUser({
        role: 'FREELANCER',
      }),
    );

    const raw = makeWork({
      recruiterId: user.id,
    });

    await expect(
      createWork.execute({
        title: raw.title,
        description: raw.description.value,
        amountCharged: raw.amountCharged,
        endsAt: raw.endsAt.value,
        recruiterId: raw.recruiterId,
      }),
    ).rejects.toThrow();

    expect(worksRepository.works).toHaveLength(0);
  });
});
