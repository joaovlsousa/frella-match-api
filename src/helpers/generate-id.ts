import { randomUUID } from 'crypto';

export function generateId(): string {
  const uuid = randomUUID();
  const substringArray = uuid.split('-');

  const id = substringArray[0]
    .substring(0, 3)
    .concat(substringArray[4])
    .toLocaleUpperCase();

  return id;
}
