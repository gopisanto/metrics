import { DataProps } from './components/dashboard/Dashboard';

export const UNITS = {
  number: 'number',
  percentage: 'percentage',
  secs: 'secs',
  hours: 'hours',
};

export const getConsolidatedKey = (list: DataProps, keys: string[]): string =>
  keys.reduce((result, key) => {
    const unitKey = [UNITS.hours, UNITS.secs].includes(list[key])
      ? 'time'
      : list[key];
    return `${result}-${unitKey}`;
  }, '');

export const groupBy = (array: DataProps[], keys: string[]): DataProps[][] => {
  const groups = {};

  array.forEach((o) => {
    const group = JSON.stringify(getConsolidatedKey(o, keys));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });

  return Object.keys(groups).map((group) => groups[group]);
};

export const typifyVal = (fromType: string, val: number): number => {
  switch (fromType) {
    case UNITS.hours:
      return val * 60 * 60;
    case UNITS.secs:
      return val;
    case UNITS.percentage:
      return val * 100;
    default:
      return val;
  }
};

export const calculateDomainArray = (
  min: number,
  max: number,
  length: number,
  splitMode: boolean,
  type: string,
): number[] => {
  if (splitMode) {
    if (['hours', 'secs'].includes(UNITS[type])) {
      return [0, max];
    } else if (type === UNITS.percentage) {
      return [0, 100];
    }
  }
  if (length === 1) {
    if (min < 0) {
      const maxVal = min > -100 ? 100 : min;
      return [min, maxVal];
    } else if (min > 0) {
      const maxVal = max < 100 ? 100 : max;
      return [-100, maxVal];
    } else {
      return [min, 100];
    }
  }
  if (min !== max) {
    if (min < 0 && max < 0) {
      return [min, 100];
    } else if (min > 0 && max > 0) {
      return [-100, max];
    }
  }
  const minVal = min > -100 ? min : -100;
  const maxVal = max > 100 ? max : 100;
  return [minVal, maxVal];
};
