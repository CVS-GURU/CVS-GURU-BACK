import express from 'express'
import querystring from 'querystring'
import pool from '../../../middleware/MysqlConnection'
import JwtService from '../../../middleware/JwtService'
import { checkMandatory, isEmpty } from '../../utils/helpers'

const { makeResponseFormat } = require('../../../middleware/MakeResponse')

exports.getItems = (req: express.Request, res:express.Response) => {
  const tempArray = Object.keys(req.query)
  const tempMap: any = {}
  tempArray.map((key: string) => {
    const value = req.query[key] as string
    tempMap[key] = querystring.unescape(value)
  })

  const {
    store,
    from: from_price,
    to: to_price,
    category,
    title,
    sort,
    page,
    page_size
  }: requestItemParams = tempMap

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

    const queries: string[] = []
    queries.push(totalCountSql)
    queries.push(sql)

    console.log('[masonms] sql: ', sql)
    pool.transaction(queries)
    // connection.promise().query(`${totalCountSql};${sql}`)
    .then( (result: any) => {
      if (result[1].length === 0) {
        return res.json(makeResponseFormat('0000', {CONTENTS: [], HITS: 0}))
      } else {
        return res.json(makeResponseFormat('0000', {CONTENTS: result[0], HITS: result[1].length}))
      }
    })
    .catch((err: any) => {
      console.log('[masonms] error: ', err)
      // connection.end()
      return res.json(makeResponseFormat('9999', {CONTENTS: [], HITS: 0}, err))
    })
    .then( () => {
      console.log('[masonms] finally then')
    });
  } catch (error) {
    // connection.end()
    return res.json(makeResponseFormat('9999', {CONTENTS: [], HITS: 0}, error))
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
    const queries: string[] = []
    queries.push(sql)
    pool.transaction(queries)
    // connection.promise().query(sql)
    .then( (result: any) => {
      if (result[0].length === 0) {
        return res.json(makeResponseFormat('0000', {CONTENTS: [], HITS: 0}))
      } else {
        return res.json(makeResponseFormat('0000', {CONTENTS: result[0], HITS: result[0].length}))
      }
    })
    .catch((err: any) => {
      console.log('[masonms] error: ', err)
      // connection.end()
      return res.json(makeResponseFormat('9999', {CONTENTS: [], HITS: 0}, err))
    })
    .then( () => {
      console.log('[masonms] finally then')
    });
  } catch (error: any) {
    // connection.end()
    return res.json(makeResponseFormat('9999', {CONTENTS: [], HITS: 0}, error))
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

    const queries: string[] = []
    queries.push(sql)

    pool.transaction(queries)
    // connection.promise().query(sql)
    .then( (result: any) => {
      if (result[0].length === 0) {
        return res.json(makeResponseFormat('0000', {CONTENTS: [], HITS: 0}))
      } else {
        return res.json(makeResponseFormat('0000', {CONTENTS: result[0], HITS: result[0].length}))
      }
    })
    .catch((err: any) => {
      console.log('[masonms] error: ', err)
      // connection.end()
      return res.json(makeResponseFormat('9999', {CONTENTS: [], HITS: 0}, err))
    })
    .then( () => {
      console.log('[masonms] finally then')
    });
  } catch (error: any) {
    // connection.end()
    return res.json(makeResponseFormat('9999', {CONTENTS: [], HITS: 0}, error))
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
    const queries: string[] = []
    queries.push(sql)

    pool.transaction(queries)
    // connection.promise().query(sql)
    .then( (result: any) => {
      if (result[0].length === 0) {
        return res.json(makeResponseFormat('0000', {CONTENTS: [], HITS: 0}))
      } else {
        return res.json(makeResponseFormat('0000', {CONTENTS: result[0], HITS: result[0].length}))
      }
    })
    .catch((err: any) => {
      console.log('[masonms] error: ', err)
      // connection.end()
      return res.json(makeResponseFormat('9999', {CONTENTS: [], HITS: 0}, err))
    })
    .then( () => {
      console.log('[masonms] finally then')
    });
  } catch (error: any) {
    // connection.end()
    return res.json(makeResponseFormat('9999', {CONTENTS: [], HITS: 0}, error))
  }
}

exports.writeItemComment = (req: express.Request, res:express.Response) => {
  const token = JwtService.extractTokenFromRequest(req)
  const check = JwtService.decodeJWT(token as string) as any

  try {
    if (check === null) { // 토큰 검증결과 비정상 토큰
      return res.json(makeResponseFormat('5000', {}, '권한이 없습니다.'))
    } else {  // 정상토큰일때 후기 작성
      const { id: user_id } = check
      const { item_id, item_score, item_comment } = req.body

      const mandatoryKeys = {
        user_id,
        item_id,
        item_score,
      }
      const passCheck = checkMandatory(mandatoryKeys)  

      if (!passCheck.isPass) {
        return res.json(makeResponseFormat('9999', {data: passCheck.nonPassArray}, '필수입력정보 없음 '))
      }

      const itemCheckSql = `
        select *
        from item_info
        where item_id = '${item_id}'
      `
      
      const queries: string[] = []
      queries.push(itemCheckSql)

      pool.transaction(queries)
      .then( (result: any) => {
        if (result[0].length === 0) { // 기존 상품정보 없음
          return res.json(makeResponseFormat('5001', {}, '상품 ID가 잘못되었습니다.'))
        } else {  // 기존 상품정보 있음
          queries.pop()
          const comment = isEmpty(item_comment) ? '' : `'${item_comment}'`
          const insertSql = `
            insert into item_rate_user (user_id, item_id, item_score, item_comment)
            values ('${user_id}', '${item_id}', ${item_score}, ${comment})
          `
          queries.push(insertSql)
          pool.transaction(queries)
          .then( (result: any) => {
            if (result[0].length === 0) { // insert 완료 후 result[0]에 데이터 값 없음
              return res.json(makeResponseFormat('0000', {}, '후기 입력이 완료되었습니다.'))
            } else {  // insert 완료 후 result[0]에 데이터 값 없음
              return res.json(makeResponseFormat('0000', {}, '후기 입력이 완료되었습니다.'))
            }
          })
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
    }
  } catch (error) {
    return res.json(makeResponseFormat('9999', {}, error))
  }
}