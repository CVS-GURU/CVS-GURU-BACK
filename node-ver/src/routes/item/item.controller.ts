import express from 'express'
import mysql from 'mysql2';
const config = require('@config/key');

import { isEmpty } from '../../utils/helpers'

const { makeResponseFormat } = require('../../../middleware/MakeResponse')

const connection = mysql.createPool({
  host: config.dbConnection.host,
  user: config.dbConnection.user,
  password: config.dbConnection.password,
  database: config.dbConnection.database,
  multipleStatements: true
})

exports.getItems = (req: express.Request, res:express.Response) => {
  const {
    store,
    from: from_price,
    to: to_price,
    category,
    title,
    sort,
    page,
    page_size
  }: requestItemParams = req.query

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

    const totalCountSql = sql;  // 정렬기준 및 limit 없이 전체 카운트를 위한 쿼리

    if (!isEmpty(sort)) { // 정렬기준 있을 때,
      if (sort === 'price_desc') sql += ` order by item_price desc` // 가격 내림차순
      else if (sort === 'price_asc') sql += ` order by item_price asc`  // 가격 오름차순
    }
    
    let defaultPage = 0
    let defaultPageSize = 20

    if (!isEmpty(page_size) && page_size !== undefined && parseInt(page_size, 10) >= 1) {
      defaultPageSize = parseInt(page_size, 10)
    }
    if (!isEmpty(page) && page !== undefined && parseInt(page, 10) >= 1) {
      defaultPage = parseInt(page, 10) - 1
    }
    sql += ` limit ${defaultPageSize} offset ${defaultPage * defaultPageSize}`

    console.log('[masonms] sql: ', sql)
    connection.promise().query(`${totalCountSql};${sql}`)
    .then( (result: any) => {
      if (result[1].length === 0) {
        return res.json(makeResponseFormat('0000', [], 0))
      } else {
        return res.json(makeResponseFormat('0000', result[0][1], result[0][0].length))
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