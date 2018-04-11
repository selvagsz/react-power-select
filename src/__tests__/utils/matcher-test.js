// /* global describe, it, expect */
import { matcher } from './../../utils';

describe('matcher()', () => {
  it('should match string', () => {
    const option = 'option';
    expect(matcher({ option, searchTerm: '' })).toBe(true);
    expect(matcher({ option, searchTerm: 'opt' })).toBe(true);
    expect(matcher({ option, searchTerm: 'opt ' })).toBe(true);
    expect(matcher({ option, searchTerm: 'a' })).toBe(false);
  });
  it('should match number', () => {
    const option = 1234567;
    expect(matcher({ option, searchTerm: '' })).toBe(true);
    expect(matcher({ option, searchTerm: '12' })).toBe(true);
    expect(matcher({ option, searchTerm: '12 ' })).toBe(true);
    expect(matcher({ option, searchTerm: '9' })).toBe(false);
  });
  it('should match not undefined', () => {
    const option = undefined;
    expect(matcher({ option, searchTerm: '' })).toBe(false);
    expect(matcher({ option, searchTerm: 'opt' })).toBe(false);
    expect(matcher({ option, searchTerm: '12' })).toBe(false);
  });
  it('should match not null', () => {
    const option = null;
    expect(matcher({ option, searchTerm: '' })).toBe(false);
    expect(matcher({ option, searchTerm: 'opt' })).toBe(false);
    expect(matcher({ option, searchTerm: '12' })).toBe(false);
  });

  const option = { name: 'Matthew Stevens', age: 6, id: null };
  it('should match string in object', () => {
    expect(matcher({ option, searchTerm: '', searchIndices: 'name' })).toBe(true);
    expect(matcher({ option, searchTerm: 'mAt', searchIndices: 'name' })).toBe(true);
    expect(matcher({ option, searchTerm: 'mat', searchIndices: 'name' })).toBe(true);
    expect(matcher({ option, searchTerm: 'mat ', searchIndices: 'name' })).toBe(true);
    expect(matcher({ option, searchTerm: 'b', searchIndices: 'name' })).toBe(false);
  });
  it('should match number in object', () => {
    expect(matcher({ option, searchTerm: '', searchIndices: 'age' })).toBe(true);
    expect(matcher({ option, searchTerm: '6', searchIndices: 'age' })).toBe(true);
    expect(matcher({ option, searchTerm: '6 ', searchIndices: 'age' })).toBe(true);
    expect(matcher({ option, searchTerm: '1', searchIndices: 'age' })).toBe(false);
  });
  it('should match not undefined in object', () => {
    expect(matcher({ option, searchTerm: '', searchIndices: 'gender' })).toBe(false);
    expect(matcher({ option, searchTerm: 'opt', searchIndices: 'gender' })).toBe(false);
    expect(matcher({ option, searchTerm: '12', searchIndices: 'gender' })).toBe(false);
  });
  it('should match not null in object', () => {
    expect(matcher({ option, searchTerm: '', searchIndices: 'id' })).toBe(false);
    expect(matcher({ option, searchTerm: 'opt', searchIndices: 'id' })).toBe(false);
    expect(matcher({ option, searchTerm: '12', searchIndices: 'id' })).toBe(false);
  });
});
