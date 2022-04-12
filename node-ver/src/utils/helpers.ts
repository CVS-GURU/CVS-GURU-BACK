// parameter의 empty여부 확인(object, string 등등)
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

// 필수요소 확인 함수
/**
 *
 * @param value mandantory를 체크할 데어 목록 { key: value } 형식의 데이터를 array로 넘김
 * @returns isPass: boolean, nonPassArray: array / pass여부는 true, false로 확인 pass가 안된 내용은 nonPassArray에 string으로 저장
 */
export const checkMandatory = (value: any) => {
  let isPass = true
  const nonPassArray: any = []

  Object.keys(value).map((t) => {
    if (isEmpty(value[t])) {
      nonPassArray.push(t)
      isPass = false
    }
    return true
  })

  return {
    isPass,
    nonPassArray,
  }
}

export const parseCookies = (cookie = '') => {
  return cookie
    .split(';')
    .map((v) => v.split('='))
    .map(([k, ...vs]) => [k, vs.join('=')])
    .reduce((acc: any, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v)
      return acc
    }, {})
}
