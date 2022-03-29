import express from 'express'
import mysql from 'mysql2';
const router = express.Router()
const config = require('@config/key');

const connection = mysql.createPool({
  host: config.dbConnection.host,
  user: config.dbConnection.user,
  password: config.dbConnection.password,
  database: config.dbConnection.database
})

exports.ping = (req: express.Request, res: express.Response) => {
  return res.json({
    message: 'pong'
  })
}

exports.getItemWithPrice = (req: express.Request, res:express.Response) => {
  const { from_price, to_price } = req.body
  try {
    const sql = `
      select item_name as ITEM_NAME,
            item_price as ITEM_PRICE,
            item_image as ITEM_IMAGE
      from item_info
      where item_price BETWEEN '${from_price}' and '${to_price}';
    `

    connection.promise().query(sql)
    .then( (result: any) => {
      if (result[0].length === 0) {
        return res.json({
          message: '상품이 없습니다.'
        })
      } else {
        return res.json({
          result: '0000',
          data: result[0]
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

    
    
  } catch (error) {
    return res.json({
      result: '9999',
      data: null,
      message: error
    })
  }
  
}