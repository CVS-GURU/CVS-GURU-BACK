const makeResponseFormat = (
  result: string, 
  data: any,
  hits: number,
  reason: string = 'success') => {
  switch (result) {
    case '0000':
      return ({
        result,
        reason,
        data: {
          HITS: hits,
          CONTENTS: data
        }
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