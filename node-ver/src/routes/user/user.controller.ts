import express from 'express'
import JwtService from '../../../middleware/JwtService'
import pool from '../../../middleware/MysqlConnection'
import { isEmpty } from '../../utils/helpers'

const { makeResponseFormat } = require('../../../middleware/MakeResponse')

exports.login = async (req: express.Request, res: express.Response) => {
  const { user_id, password } = req.body
  if (isEmpty(user_id) || isEmpty(password)) {
    return res.json(makeResponseFormat('9999', {}, '필수입력정보 없음'))
  }
  try {
    const sql = `
      select user_id as USER_ID,
            password as PASSWORD,
            user_name as USER_NAME,
            user_email as USER_EMAIL,
            user_profile_image as USER_PROFILE_IMAGE
      from user_info
      where user_id = '${user_id}'
    `
    const queries: string[] = []
    queries.push(sql)

    pool.transaction(queries)
    // connection.promise().query(sql)
    .then( (result: any) => {
      if (result[0].length === 0) {
        return res.json(makeResponseFormat('4001', {}, '사용자가 없습니다.'))
      } else {
        const dbPassword = result[0][0].PASSWORD
        const inputPassword = password
        
        try {
          // const hashPassword = crypto.createHash('sha256').update(inputPassword).digest('hex')
          if (inputPassword === dbPassword) {  // 패스워드 동일
            const accessToken = JwtService.createJWT({
              user_id: result[0][0].USER_ID,
              expire_date: '1d'
            })
            const refreshToken = JwtService.createJWT({
              user_id: result[0][0].USER_ID,
              expire_date: '30d'
            })

            res.setHeader(
              'Set-Cookie',
              `access_token=${accessToken}; path=/; expires=${new Date(Date.now() + 60 * 60 * 24 * 1000 * 3, // 1일 
              )}; httponly`,
            );
            // res.setHeader(
            //   'Set-Cookie',
            //   `refresh_token=${refreshToken}; path=/; expires=${new Date(Date.now() + 60 * 60 * 24 * 1000 * 30, // 30일 
            //   )}; httponly`,
            // );

            return res.json(makeResponseFormat('0000', {
              USER_DATA: {
                USER_ID: result[0][0].USER_ID,
                USER_NAME: result[0][0].USER_NAME,
                ACCESS_TOKEN: accessToken,
                REFRESH_TOKEN: refreshToken,
                USER_EMAIL: result[0][0].USER_EMAIL,
                USER_PROFILE_IMAGE: result[0][0].USER_PROFILE_IMAGE
              }
            }))
          } else {
            return res.json(makeResponseFormat('4002', {}, '패스워드가 잘못되었습니다.'))
          }
        } catch (error: any) {
          console.log('[masonms] error: ', error)
          return res.json(makeResponseFormat('9999', {}, error.code))
        }        
      }
    })
    .catch((err: any) => {
      console.log('[masonms] error: ', err)
      // connection.end()
      return res.json(makeResponseFormat('9999', {}, err))
    })
    .then( () => {
      console.log('[masonms] finally then')
    });

  } catch (error: any) {
    return res.json(makeResponseFormat('9999', [], 0, error))  
  }
}

exports.idCheck = (req: express.Request, res: express.Response) => {
  const { user_id } = req.body
  if (isEmpty(user_id)) {
    return res.json(makeResponseFormat('9999', {}, '필수입력정보 없음'))
  }
  try {
    const idCheckSql = `
      select user_id as USER_ID
      from user_info
      where user_id = '${user_id}'
    `
    
    const queries: string[] = []
    queries.push(idCheckSql)

    pool.transaction(queries)
    // connection.promise().query(idCheckSql)
    .then( (result: any) => {
      if (result[0].length === 0) { // 기존회원정보 없음
        return res.json(makeResponseFormat('0000', {}, '가입이 가능한 아이디입니다.'))
      } else {  // 기존회원정보 있음
        // 기존 회원있음 return
        return res.json(makeResponseFormat('4000', {}, '이미 가입한 회원입니다.'))
      }
    })
    .catch((err: any) => {
      console.log('[masonms] idCheck error: ', err)
      // connection.end()
      return res.json(makeResponseFormat('9999', {}, err))
    })
    .then( () => {
      console.log('[masonms] finally then')
    });

  } catch (error) {
    console.log('[masonms] try error: ', error)
    return res.json(makeResponseFormat('9999', [], 0, error))  
  }
}

exports.signup = (req: express.Request, res: express.Response) => {
  const { user_id, password, user_name, user_email, user_profile_image } = req.body
  if (isEmpty(user_id) || isEmpty(password) || isEmpty(user_name) || isEmpty) {
    return res.json(makeResponseFormat('9999', {}, '필수입력정보 없음'))
  }
  try {
    const idCheckSql = `
      select user_id as USER_ID
      from user_info
      where user_id = '${user_id}'
    `
    
    const queries: string[] = []
    queries.push(idCheckSql)

    pool.transaction(queries)
    // connection.promise().query(idCheckSql)
    .then( (result: any) => {
      if (result[0].length === 0) { // 기존회원정보 없음
        // 회원가입 insert 진행
        queries.pop()
        const insertSql = `
          insert into user_info (user_id, password, user_name, user_email, user_profile_image)
          values ('${user_id}', '${password}', '${user_name}', '${user_email}', '${user_profile_image}');
        `
        queries.push(insertSql)
        pool.transaction(queries)
        .then( (result: any) => {
          console.log('[masonms] insert result: ', result)
          if (result[0].length === 0) { // insert 완료 후 result[0]에 데이터 값 없음
            return res.json(makeResponseFormat('0000', {}, '회원가입이 완료되었습니다.'))
          } else {  // insert 완료 후 result[0]에 데이터 값 없음
           return res.json(makeResponseFormat('0000', {}, '회원가입이 완료되었습니다.'))
         }
        })
      } else {  // 기존회원정보 있음
        // 기존 회원있음 return
        return res.json(makeResponseFormat('4000', {}, '이미 가입한 회원입니다.'))
      }
    })
    .catch((err: any) => {
      console.log('[masonms] idCheck error: ', err)
      // connection.end()
      return res.json(makeResponseFormat('9999', {}, err))
    })
    .then( () => {
      console.log('[masonms] finally then')
    });

  } catch (error) {
    console.log('[masonms] try error: ', error)
    return res.json(makeResponseFormat('9999', [], 0, error))  
  }
}

exports.changeUserInfo = (req: express.Request, res: express.Response) => {

}

/*
const checkToken = (req: express.Request, res: express.Response) => {
  try {
    const token = JwtService.extractTokenFromRequest(req)
    const check = JwtService.decodeJWT(token as string)

    if (check === null) {
      return res.json({
        message: '권한없음'
      })
    }
    return res.json({
      message: 'success'
    })
  } catch (error) {
    console.log('[masonms] check error: ', error)
    return res.json({
      message: '권한없음'
    })
  }
}

router.post('/login', async (req: express.Request, res: express.Response) => {
  const { id } = req.body
  try {
    const sql = `
      select *
      from user_info
      where user_id = "${id}"
    `

    connection.promise().query(sql)
    .then( (result: any) => {
      if (result[0].length === 0) {
        return res.json({
          id: id,
          token: null,
          message: '없는 계정입니다.'
        })
      }
    })
    .catch((err) => {
      console.log('[masonms] error: ', err)
      connection.end()
    })
    .then( () => {
      console.log('[masonms] finally then')
    });

    const token = JwtService.createJWT({id})
    return res.json({
      id: id,
      token: token
    })
  } catch (error) {
    console.log('[masonms] token createError: ', error)
    return res.json({
      id: id,
      token: null,
      message: '네트워크 오류 입니다.'
    })
  }
})

router.get('/check_token', (req: express.Request, res: express.Response) => {
  try {
    const token = JwtService.extractTokenFromRequest(req)
    const check = JwtService.decodeJWT(token as string)

    if (check === null) {
      return res.json({
        message: '권한없음'
      })
    }
    return res.json({
      message: 'success'
    })
  } catch (error) {
    console.log('[masonms] check error: ', error)
    return res.json({
      message: '권한없음'
    })
  }
})
*/