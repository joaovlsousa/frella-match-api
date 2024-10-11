import { User, UserProps } from '@application/entities/user';

type Override = Partial<UserProps>;

export function makeUser(override: Override = {}) {
  return new User({
    name: 'João',
    email: 'joao@mail.com',
    role: 'FREELANCER',
    ...override,
  });
}
