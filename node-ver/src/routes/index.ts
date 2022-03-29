const router = require('express').Router()

const user = require('./user')
const item = require('./item')
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 유저 추가 수정 삭제 조회
 */
router.use("/user", user)

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: 물건 정보 조회
 */
router.use('/item', item)

module.exports = router