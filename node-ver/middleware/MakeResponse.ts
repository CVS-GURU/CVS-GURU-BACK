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
    case '4000':
    return ({
      result,
      reason: '이미 가입한 회원입니다.',
      data: {}
    })
    case '4001':
    return ({
      result,
      reason: '사용자가 없습니다.',
      data: {}
    })
    case '4002':
    return ({
      result,
      reason: '비밀번호가 다릅니다.',
      data: {}
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