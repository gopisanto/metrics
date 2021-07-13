import { calculateDomainArray, getConsolidatedKey, groupBy } from './helper';
import data from './data.json';

/*export const getConsolidatedKey = (list: DataProps, keys: string[]): string =>
  keys.reduce((result, key) => `${result}-${list[key]}`);

export const groupBy = (array: DataProps[], keys: string[]): DataProps[][] => {
  const groups = {};

  array.forEach((o) => {
    const group = JSON.stringify(getConsolidatedKey(o, keys));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });

  return Object.keys(groups).map((group) => groups[group]);
};*/

describe('helpers', () => {
  it('helper -> getConsolidatedKey ', () => {
    const obj = {
      id: 'oee',
      label: 'oee',
      value: 0.68,
      type: 'percentage',
      description: 'The overall equipment efficiency in %',
      category: 'efficiency',
    };
    const keys = ['category', 'type'];
    const expected = '-efficiency-percentage';

    expect(getConsolidatedKey(obj, keys)).toEqual(expected);
  });

  it('helper -> groupBy', () => {
    const prop = data.data;
    const keys = ['category', 'type'];
    const expected = [
      [
        {
          ...prop[0],
        },
      ],
      [{ ...prop[1] }, { ...prop[2] }],
      [{ ...prop[3] }, { ...prop[4] }],
      [{ ...prop[5] }, { ...prop[6] }],
    ];
    expect(groupBy(prop, keys)).toEqual(expected);
  });

  it('helper -> calculateDomainArray', () => {
    const data = [
      { min: -200, max: -100, length: 3 },
      { min: 200, max: 100, length: 2 },
      { min: -100, max: 300, length: 5 },
    ];

    expect(
      calculateDomainArray(data[0].min, data[0].max, data[0].length),
    ).toEqual([-200, 100]);

    expect(
      calculateDomainArray(data[1].min, data[1].max, data[1].length),
    ).toEqual([-100, 100]);

    expect(
      calculateDomainArray(data[2].min, data[2].max, data[2].length),
    ).toEqual([-100, 300]);
  });
});
