import { Body } from '@application/entities/body';
import { EndsAt } from '@application/entities/ends-at';
import { Submission, SubmissionProps } from '@application/entities/submission';
import { generateId } from '@helpers/generate-id';
import * as dayjs from 'dayjs';

type Override = Partial<SubmissionProps>;

export function makeSubmission(override: Override = {}) {
  return new Submission({
    body: new Body('Gostaria dar minha contribuição com este projeto'),
    amountCharged: 100,
    deliveryTime: new EndsAt(dayjs().add(1, 'd').toDate()),
    freelancerId: generateId(),
    workId: generateId(),
    ...override,
  });
}
