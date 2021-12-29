export const removeDuplicateObject = (
  originalArray: Array<any>,
  key: string,
): Array<any> => {
  const set = new Set();
  const filteredArr = originalArray.filter(el => {
    const duplicate = set.has(el[key]);
    set.add(el[key]);
    return !duplicate;
  });
  return filteredArr;
};
