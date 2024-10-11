import * as dayjs from 'dayjs';

import { EndsAt } from './ends-at';

describe('Ends at date', () => {
  it('should be able to create a ends at date', () => {
    const endsAt = new EndsAt(dayjs().add(1, 'd').toDate());

    expect(endsAt).toBeTruthy();
  });

  it('should not be able to create a ends at date', () => {
    expect(() => new EndsAt(dayjs().subtract(1, 'd').toDate())).toThrow();
  });
});
