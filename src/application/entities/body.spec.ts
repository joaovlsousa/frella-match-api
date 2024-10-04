import { Body } from './body';

describe('Submission Body', () => {
  it('should be able to create a submission body', () => {
    const content = new Body(
      'Gostaria dar minha contribuição com este projeto',
    );

    expect(content).toBeTruthy();
  });

  it('should not be able to create a submission body with less than 5 characters', () => {
    expect(() => new Body('aaa')).toThrow();
  });

  it('should not be able to create a submission body with more than 255 characters', () => {
    expect(() => new Body('a'.repeat(256))).toThrow();
  });
});
