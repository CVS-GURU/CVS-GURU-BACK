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

exports.getItems = (req: express.Request, res:express.Response) => {
  const {
    store,
    from: from_price,
    to: to_price,
    category,
    title,
    sort
  } = req.query

  try {
    let sql = `
      select item_name as ITEM_NAME,
            item_price as ITEM_PRICE,
            item_image as ITEM_IMAGE,
            item_id as ITEM_ID
      from item_info
      where 3=3
    `

    if (!isEmpty(store)) {  // 편의점 정보 있을 때,
      sql += ` and store_kind = '${store}'`
    }
    if (!isEmpty(from_price)) { // 최소가격 있을 때,
      sql += ` and item_price >= '${from_price}'`
    }
    if (!isEmpty(to_price)) { // 최대가격 있을 때,
      sql += ` and item_price <= '${to_price}'`
    }
    if (!isEmpty(category)) { // 카테고리 있을 때,
      sql += ` and item_category = '${category}'`
    }
    if (!isEmpty(title)) {  // 상품명이 있을 때,
      sql += ` and item_name like '%${title}%'`
    }
    if (!isEmpty(sort)) {
      if (sort === 'price_desc') sql += ` order by item_price desc` // 가격 내림차순
      else if (sort === 'price_asc') sql += ` order by item_price asc`  // 가격 오름차순
    }

    console.log('[masonms] sql: ', sql)
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

exports.getItemRecently = (req: express.Request, res:express.Response) => {
  try {
    const sql = `
      select item_name as ITEM_NAME,
                item_price as ITEM_PRICE,
                item_image as ITEM_IMAGE,
                item_id as ITEM_ID
          from item_info
          where 3=3
      order by insert_date desc
      limit 20
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