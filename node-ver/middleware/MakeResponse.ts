const makeResponseFormat = (
  result: string, 
  data: any,
  reason: string = 'success') => {
  switch (result) {
    case '0000':
      return ({
        result,
        reason,
        data: data
      })
    default:
      return ({
        result,
        reason,
        data: null
      })
  }
}

module.exports = { makeResponseFormat }