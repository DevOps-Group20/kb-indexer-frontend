export const toUpperCase = (value: string) => value == 'api'
  ? value.toUpperCase()
  : value[0].toUpperCase() + value.slice(1);
