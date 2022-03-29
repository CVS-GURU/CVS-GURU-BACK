import express from 'express'
import mysql from 'mysql2';
const router = express.Router()
const config = require('@config/key');
import JwtService from '../../../middleware/JwtService'

const connection = mysql.createPool({
  host: config.dbConnection.host,
  user: config.dbConnection.user,
  password: config.dbConnection.password,
  database: config.dbConnection.database
})

// const tokenChecker = (req: express.Request) => {
//   const userIdFromToken = JwtService.getUserIdFromRequest(req)
//   req.body.userId = userIdFromToken
//   return req
// }

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

module.exports = router;