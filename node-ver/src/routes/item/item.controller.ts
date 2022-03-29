import express from 'express'
import mysql from 'mysql2';
const router = express.Router()
const config = require('@config/key');

import { isEmpty } from '../../utils/helpers'

const { makeResponseFormat } = require('../../../middleware/MakeResponse')

const connection = mysql.createPool({
  host: config.dbConnection.host,
  user: config.dbConnection.user,
  password: config.dbConnection.password,
  database: config.dbConnection.database
})

exports.getItemsWithFilter = (req: express.Request, res:express.Response) => {
  const {
    store

  } = req.query

  isEmpty(store)
}

exports.getItemWithPrice = (req: express.Request, res:express.Response) => {
  const { from: from_price, to: to_price } = req.query
  try {
    const sql = `
      select item_name as ITEM_NAME,
            item_price as ITEM_PRICE,
            item_image as ITEM_IMAGE,
            item_id as ITEM_ID
      from item_info
      where item_price BETWEEN '${from_price}' and '${to_price}';
    `

    connection.promise().query(sql)
    .then( (result: any) => {
      if (result[0].length === 0) {
        return res.json(makeResponseFormat('0000', [], 0))
      } else {
        return res.json(makeResponseFormat('0000', result[0], result[0].length))
      }
    })
    .catch((err) => {
      console.log('[masonms] error: ', err)
      connection.end()
      return res.json(makeResponseFormat('9999', [], 0, err))
    })
    .then( () => {
      console.log('[masonms] finally then')
    });
  } catch (error) {
    connection.end()
    return res.json(makeResponseFormat('9999', [], 0, error))
  }
}

exports.getItemWithTitle = (req: express.Request, res:express.Response) => {
  const { title: search_title } = req.query
  try {
    const sql = `
      select item_name as ITEM_NAME,
            item_price as ITEM_PRICE,
            item_image as ITEM_IMAGE,
            item_id as ITEM_ID
      from item_info
      where item_name like '%${search_title}%';
    `

    connection.promise().query(sql)
    .then( (result: any) => {
      if (result[0].length === 0) {
        return res.json(makeResponseFormat('0000', [], 0))
      } else {
        return res.json(makeResponseFormat('0000', result[0], result[0].length))
      }
    })
    .catch((err) => {
      console.log('[masonms] error: ', err)
      connection.end()
      return res.json(makeResponseFormat('9999', [], 0, err))
    })
    .then( () => {
      console.log('[masonms] finally then')
    });
  } catch (error) {
    connection.end()
    return res.json(makeResponseFormat('9999', [], 0, error))
  }
}

exports.getCategoryData = (req: express.Request, res:express.Response) => {
  try {
    const sql = `
      select code_id as CODE_ID,
             code_name as CODE_NAME
      from base_code
      where code_id like 'CA%';
    `

    connection.promise().query(sql)
    .then( (result: any) => {
      if (result[0].length === 0) {
        return res.json(makeResponseFormat('0000', [], 0))
      } else {
        return res.json(makeResponseFormat('0000', result[0], result[0].length))
      }
    })
    .catch((err) => {
      console.log('[masonms] error: ', err)
      connection.end()
      return res.json(makeResponseFormat('9999', [], 0, err))
    })
    .then( () => {
      console.log('[masonms] finally then')
    });
  } catch (error) {
    connection.end()
    return res.json(makeResponseFormat('9999', [], 0, error))
  }
}

exports.getItemWithCategory = (req: express.Request, res:express.Response) => {
  const { category } = req.query
  try {
    const sql = `
      select item_name as ITEM_NAME,
            item_price as ITEM_PRICE,
            item_image as ITEM_IMAGE,
            item_id as ITEM_ID
      from item_info
      where item_category like '${category}%';
    `

    connection.promise().query(sql)
    .then( (result: any) => {
      if (result[0].length === 0) {
        return res.json(makeResponseFormat('0000', [], 0))
      } else {
        return res.json(makeResponseFormat('0000', result[0], result[0].length))
      }
    })
    .catch((err) => {
      console.log('[masonms] error: ', err)
      connection.end()
      return res.json(makeResponseFormat('9999', [], 0, err))
    })
    .then( () => {
      console.log('[masonms] finally then')
    });
  } catch (error) {
    connection.end()
    return res.json(makeResponseFormat('9999', [], 0, error))
  }
}

exports.getItemDetail = (req: express.Request, res:express.Response) => {
  const { id } = req.query
  try {
    const sql = `
      select item_name as ITEM_NAME,
            item_price as ITEM_PRICE,
            item_image as ITEM_IMAGE,
            item_id as ITEM_ID,
            item_category as ITEM_CATEGORY,
            store_kind as STORE_KIND,
            item_description as ITEM_DESCRIPTION
      from item_info
      where item_id = '${id}';
    `

    connection.promise().query(sql)
    .then( (result: any) => {
      if (result[0].length === 0) {
        return res.json(makeResponseFormat('0000', [], 0))
      } else {
        return res.json(makeResponseFormat('0000', result[0], result[0].length))
      }
    })
    .catch((err) => {
      console.log('[masonms] error: ', err)
      connection.end()
      return res.json(makeResponseFormat('9999', [], 0, err))
    })
    .then( () => {
      console.log('[masonms] finally then')
    });
  } catch (error) {
    connection.end()
    return res.json(makeResponseFormat('9999', [], 0, error))
  }
}