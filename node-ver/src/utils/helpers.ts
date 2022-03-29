export const isEmpty = (value: any) => {
  if (
    value === '' ||
    value === 'undefined' ||
    value === 'null' ||
    value === undefined ||
    value === null ||
    (value !== null &&
      String(typeof value).toLowerCase() === 'object' &&
      !Object.keys(value).length)
  ) {
    return true
  }

  //array
  if (Array.isArray(value) && value.length === 0) {
    return true
  }

  return false
}