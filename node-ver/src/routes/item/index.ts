const itemRouter = require("express").Router()
const itemController = require("./item.controller")

/**
 * @swagger
 * /api/item/get-items-with-price:
 *  post:
 *   summary: "가격대를 이용하여 물건 조회"
 *   description: ""
 *   tags: [Items]
 *   responses:
 *     "200":
 *       description: 가격대 물건정보
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                 result:
 *                   type: string
 *                 users:
 *                   data: object
 *                   example:
 *                       [
                          {
                              "ITEM_NAME": "햄)내슈빌핫치킨버거",
                              "ITEM_PRICE": "3400",
                              "ITEM_IMAGE": "http://bgf-cu.xcache.kinxcdn.com/product/8809802263307.jpg"
                          },
                          {
                              "ITEM_NAME": "김)진도대파소불고기유부",
                              "ITEM_PRICE": "3500",
                              "ITEM_IMAGE": "http://bgf-cu.xcache.kinxcdn.com/product/8809802263741.jpg"
                          }
 *                       ]
 */
itemRouter.get("/get-item-with-price", itemController.getItemWithPrice)

module.exports = itemRouter