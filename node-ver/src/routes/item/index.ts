const itemRouter = require("express").Router()
const itemController = require("./item.controller")

/**
 * @swagger
 *  /api/item/get-items-with-price:
 *    get:
 *      summary: "가격대를 이용하여 물건 조회"
 *      description: ""
 *      tags: [Items]
 *      parameters:
 *      - in: query
 *        name: from
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: string
 *      responses:
 *        "200":
 *          description: 가격대 물건정보
 *          content:
 *            application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: string
 *                  users:
 *                    data: object
 *                    example:
 *                       [{
 *                             "ITEM_NAME": "햄)내슈빌핫치킨버거",
 *                             "ITEM_PRICE": "3400",
 *                             "ITEM_IMAGE": "http://bgf-cu.xcache.kinxcdn.com/product/8809802263307.jpg"
 *                         },
 *                         {
 *                             "ITEM_NAME": "김)진도대파소불고기유부",
 *                             "ITEM_PRICE": "3500",
 *                             "ITEM_IMAGE": "http://bgf-cu.xcache.kinxcdn.com/product/8809802263741.jpg"
 *                         }]
 */
itemRouter.get("/get-item-with-price", itemController.getItemWithPrice)

/**
 * @swagger
 *  /api/item/get-items-with-title:
 *    get:
 *      summary: "물건명을 이용하여 물건 조회"
 *      description: ""
 *      tags: [Items]
 *      responses:
 *        "200":
 *          description: 물건명으로 조회한 물건정보
 *          content:
 *            application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  result: string
 *                  data:
 *                    data: object
 *                    example:
 *                       [{
 *                             "ITEM_NAME": "햄)내슈빌핫치킨버거",
 *                             "ITEM_PRICE": "3400",
 *                             "ITEM_IMAGE": "http://bgf-cu.xcache.kinxcdn.com/product/8809802263307.jpg"
 *                         },
 *                         {
 *                             "ITEM_NAME": "김)진도대파소불고기유부",
 *                             "ITEM_PRICE": "3500",
 *                             "ITEM_IMAGE": "http://bgf-cu.xcache.kinxcdn.com/product/8809802263741.jpg"
 *                         }]
 */

itemRouter.get("/get-item-with-title", itemController.getItemWithTitle)

/**
 * @swagger
 *  /api/item/get-category-data:
 *    get:
 *      summary: "현재 지원하는 카테고리 정보 조회"
 *      description: ""
 *      tags: [Items]
 *      responses:
 *        "200":
 *          description: 현재 제공하는 카테고리 정보들을 조회한다
 *          content:
 *            application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: string
 *                  users:
 *                    data: object
 *                    example:
 *                       [{
 *                             "ITEM_NAME": "햄)내슈빌핫치킨버거",
 *                             "ITEM_PRICE": "3400",
 *                             "ITEM_IMAGE": "http://bgf-cu.xcache.kinxcdn.com/product/8809802263307.jpg"
 *                         },
 *                         {
 *                             "ITEM_NAME": "김)진도대파소불고기유부",
 *                             "ITEM_PRICE": "3500",
 *                             "ITEM_IMAGE": "http://bgf-cu.xcache.kinxcdn.com/product/8809802263741.jpg"
 *                         }]
 */

itemRouter.get("/get-category-data", itemController.getCategoryData)

/**
 * @swagger
 *  /api/item/get-item-with-category:
 *    get:
 *      summary: "현재 선택한 카테고리에 맞는 물건 선택"
 *      description: ""
 *      tags: [Items]
 *      responses:
 *        "200":
 *          description: 현재 제공하는 카테고리 정보들을 조회한다
 *          content:
 *            application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: string
 *                  users:
 *                    data: object
 *                    example:
 *                       [{
 *                             "ITEM_NAME": "햄)내슈빌핫치킨버거",
 *                             "ITEM_PRICE": "3400",
 *                             "ITEM_IMAGE": "http://bgf-cu.xcache.kinxcdn.com/product/8809802263307.jpg"
 *                         },
 *                         {
 *                             "ITEM_NAME": "김)진도대파소불고기유부",
 *                             "ITEM_PRICE": "3500",
 *                             "ITEM_IMAGE": "http://bgf-cu.xcache.kinxcdn.com/product/8809802263741.jpg"
 *                         }]
 */

itemRouter.get("/get-item-with-category", itemController.getItemWithCategory)

module.exports = itemRouter