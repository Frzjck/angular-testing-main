import { isNumber, toBooleanProperty } from './type-coercion';

describe(`isNumber Function`, () => {
  it(`should treat integer 100 as number`, () => {
    const result = isNumber(100);
    expect(result).toBe(true);
  });
  it(`should treat string 100 as number`, () => {
    const result = isNumber('100');
    expect(result).toBe(true);
  });
  it(`should not accept empty strings`, () => {
    const result = isNumber('');
    expect(result).toBe(false);
  });
  it(`should not accept mix of strings and integers`, () => {
    const stringWithIntegers = '123abc';
    const result = isNumber(stringWithIntegers);
    expect(result).toBe(false);
  });
  it(`should not accept objects`, () => {
    const anyObject = {};
    const result = isNumber(anyObject);
    expect(result).toBe(false);
  });
});

describe(`toBooleanProperty Function`, () => {
  it(`should coerce "false" to boolean false`, () => {
    expect(toBooleanProperty('false')).toBe(false);
  });
  it(`should coerce "" to boolean true`, () => {
    expect(toBooleanProperty('')).toBe(true);
  });
  it(`should coerce null to boolean false`, () => {
    expect(toBooleanProperty(null)).toBe(false);
  });
});
