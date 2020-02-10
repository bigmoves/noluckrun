import { keys } from 'lodash/object';

export const getCountData = (data, key) => {
  const counts = data.reduce((pv, cv) => {
    if (pv[cv[key]]) {
      pv[cv[key]].count = pv[cv[key]].count + 1;
      return pv;
    }

    return {
      ...pv,
      [cv[key]]: { [key]: cv[key], count: 1 }
    };
  }, {});

  return keys(counts)
    .filter(i => counts[i][key])
    .map(i => counts[i]);
};
