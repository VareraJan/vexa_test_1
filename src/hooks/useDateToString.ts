export const DateToString = (seconds: number) => {
  let dateStr = new Date(seconds * 1000).toISOString().slice(2, 10).split('-').reverse().join('/');

  return dateStr;
};
