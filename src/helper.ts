import { DataProps } from './components/dashboard/Dashboard';

export const getConsolidatedKey = (list: DataProps, keys: string[]): string =>
  keys.reduce((result, key) => `${result}-${list[key]}`);

export const groupBy = (array: DataProps[], keys: string[]): DataProps[][] => {
  const groups = {};

  array.forEach((o) => {
    const group = JSON.stringify(getConsolidatedKey(o, keys));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });

  return Object.keys(groups).map((group) => groups[group]);
};

export const calculateDomainArray = (
  min: number,
  max: number,
  length: number,
): number[] => {
  if (length === 1) {
    if (min === max) {
      if (min < 0) {
        return [min, -min];
      } else if (min > 0) {
        return [-min, max];
      } else {
        return [min, 200];
      }
    }
  }
  if (min !== max) {
    if (min < 0 && max < 0) {
      return [min, -min];
    } else if (min > 0 && max > 0) {
      return [0, max];
    }
  }
  return [min, max];
};
