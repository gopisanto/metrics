import { useEffect, useState } from 'react';

const useMedia = (queries: string[], values: string[]): string => {
  const mediaQueryLists = queries.map((q) => window.matchMedia(q));

  const getValue = () => {
    const index = mediaQueryLists.findIndex((mql) => mql.matches);

    return typeof values[index] !== 'undefined' ? values[index] : '';
  };

  const [value, setValue] = useState(getValue);

  useEffect(
    () => {
      const handler = () => setValue(getValue);

      mediaQueryLists.forEach((mql) => mql.addEventListener('change', handler));

      return () =>
        mediaQueryLists.forEach((mql) =>
          mql.removeEventListener('change', handler),
        );
    },
    [], // Empty array ensures effect is only run on mount and unmount
  );

  return value;
};

export default useMedia;
