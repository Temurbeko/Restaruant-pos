export const formatNumberWithSpaces = (num: number | string): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
