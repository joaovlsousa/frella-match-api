import { Body } from '@application/entities/body';
import { EndsAt } from '@application/entities/ends-at';
import { Work, WorkProps } from '@application/entities/work';
import { generateId } from '@helpers/generate-id';
import * as dayjs from 'dayjs';

type Override = Partial<WorkProps>;

export function makeWork(override: Override = {}) {
  return new Work({
    title: 'Novo projeto',
    description: new Body('Projeto para criação de um site.'),
    amountCharged: 100,
    endsAt: new EndsAt(dayjs().add(1, 'd').toDate()),
    freelancerId: generateId(),
    recruiterId: generateId(),
    ...override,
  });
}
