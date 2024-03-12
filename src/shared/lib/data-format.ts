export const getArrayToObject = <T extends string | number | symbol>(obj: Record<T, string>) => {
  return Object.entries<string>(obj).map(([value, label]) => ({ value, label }));
};
