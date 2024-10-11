import { makeSubmission } from '@test/factories/submission-factory';
import { makeUser } from '@test/factories/user-factory';
import { makeWork } from '@test/factories/work-factory';
import { InMemorySubmissionsRepository } from '@test/repositories/in-memory-submissions-repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { InMemoryWorksRepository } from '@test/repositories/in-memory-works-repository';

import { CreateSubmission } from './create-submission';
import { CreateUser } from './create-user';
import { CreateWork } from './create-work';

describe('Create submission', () => {
  it('should be able to create a submission', async () => {
    const submissionsRepository = new InMemorySubmissionsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const worksRepository = new InMemoryWorksRepository();

    const createUser = new CreateUser(usersRepository);
    const createWork = new CreateWork(worksRepository, usersRepository);
    const createSubmission = new CreateSubmission(
      submissionsRepository,
      usersRepository,
      worksRepository,
    );

    const { user: recruiter } = await createUser.execute(
      makeUser({
        role: 'RECRUITER',
        email: 'recruiter@mail.com',
      }),
    );

    const rawWork = makeWork({
      recruiterId: recruiter.id,
    });

    const { work } = await createWork.execute({
      title: rawWork.title,
      description: rawWork.description.value,
      amountCharged: rawWork.amountCharged,
      endsAt: rawWork.endsAt.value,
      recruiterId: rawWork.recruiterId,
    });

    const { user: freelancer } = await createUser.execute(
      makeUser({
        role: 'FREELANCER',
        email: 'freelancer@mail.com',
      }),
    );

    const rawSubmission = makeSubmission({
      workId: work.id,
      freelancerId: freelancer.id,
    });

    const { submission } = await createSubmission.execute({
      description: rawSubmission.body.value,
      amountCharged: rawSubmission.amountCharged,
      endsAt: rawSubmission.deliveryTime.value,
      freelancerId: rawSubmission.freelancerId,
      workId: rawSubmission.workId,
    });

    expect(submissionsRepository.submissions).toHaveLength(1);
    expect(submissionsRepository.submissions[0]).toEqual(submission);
  });

  it('should not be able to create a submission because freelancer not found', async () => {
    const submissionsRepository = new InMemorySubmissionsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const worksRepository = new InMemoryWorksRepository();

    const createUser = new CreateUser(usersRepository);
    const createWork = new CreateWork(worksRepository, usersRepository);
    const createSubmission = new CreateSubmission(
      submissionsRepository,
      usersRepository,
      worksRepository,
    );

    const { user: recruiter } = await createUser.execute(
      makeUser({
        role: 'RECRUITER',
      }),
    );

    const rawWork = makeWork({
      recruiterId: recruiter.id,
    });

    await createWork.execute({
      title: rawWork.title,
      description: rawWork.description.value,
      amountCharged: rawWork.amountCharged,
      endsAt: rawWork.endsAt.value,
      recruiterId: rawWork.recruiterId,
    });

    const rawSubmission = makeSubmission({
      workId: rawWork.id,
    });

    await expect(
      createSubmission.execute({
        description: rawSubmission.body.value,
        amountCharged: rawSubmission.amountCharged,
        endsAt: rawSubmission.deliveryTime.value,
        freelancerId: rawSubmission.freelancerId,
        workId: rawSubmission.workId,
      }),
    ).rejects.toThrow();

    expect(submissionsRepository.submissions).toHaveLength(0);
  });

  it('should not be able to create a submission because user is a recruiter', async () => {
    const submissionsRepository = new InMemorySubmissionsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const worksRepository = new InMemoryWorksRepository();

    const createUser = new CreateUser(usersRepository);
    const createWork = new CreateWork(worksRepository, usersRepository);
    const createSubmission = new CreateSubmission(
      submissionsRepository,
      usersRepository,
      worksRepository,
    );

    const { user } = await createUser.execute(
      makeUser({
        role: 'RECRUITER',
      }),
    );

    const rawWork = makeWork({
      recruiterId: user.id,
    });

    await createWork.execute({
      title: rawWork.title,
      description: rawWork.description.value,
      amountCharged: rawWork.amountCharged,
      endsAt: rawWork.endsAt.value,
      recruiterId: rawWork.recruiterId,
    });

    const rawSubmission = makeSubmission({
      freelancerId: user.id,
      workId: rawWork.id,
    });

    await expect(
      createSubmission.execute({
        description: rawSubmission.body.value,
        amountCharged: rawSubmission.amountCharged,
        endsAt: rawSubmission.deliveryTime.value,
        freelancerId: rawSubmission.freelancerId,
        workId: rawSubmission.workId,
      }),
    ).rejects.toThrow();

    expect(submissionsRepository.submissions).toHaveLength(0);
  });

  it('should not be able to create a submission because work not found', async () => {
    const submissionsRepository = new InMemorySubmissionsRepository();
    const usersRepository = new InMemoryUsersRepository();
    const worksRepository = new InMemoryWorksRepository();

    const createUser = new CreateUser(usersRepository);
    const createSubmission = new CreateSubmission(
      submissionsRepository,
      usersRepository,
      worksRepository,
    );

    const { user } = await createUser.execute(
      makeUser({
        role: 'FREELANCER',
      }),
    );

    const rawSubmission = makeSubmission({
      freelancerId: user.id,
    });

    await expect(
      createSubmission.execute({
        description: rawSubmission.body.value,
        amountCharged: rawSubmission.amountCharged,
        endsAt: rawSubmission.deliveryTime.value,
        freelancerId: rawSubmission.freelancerId,
        workId: rawSubmission.workId,
      }),
    ).rejects.toThrow();

    expect(submissionsRepository.submissions).toHaveLength(0);
  });
});
