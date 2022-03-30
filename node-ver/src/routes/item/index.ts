const itemRouter = require("express").Router()
const itemController = require("./item.controller")

/**
 * @swagger
 *  /api/item/get-items:
 *    get:
 *      summary: "상품 통합검색"
 *      description: "각종 필터를 이용한 상품의 통합검색 조회"
 *      tags: [Items]
 *      parameters:
 *      - in: query
 *        name: from
 *        required: true
 *        description: 최소가격
 *        schema:
 *          type: string
 *      - in: query
 *        name: to
 *        required: true
 *        description: 최대가격
 *        schema:
 *          type: string
 *      responses:
 *        "200":
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 삭제)
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                result:
 *                  type: string
 *                users:
 *                  type: object
 *                  example:
 *                    [
 *                      { "id": 1, "name": "유저1" },
 *                      { "id": 2, "name": "유저2" },
 *                      { "id": 3, "name": "유저3" }
 *                    ]
 */
itemRouter.get("/get-items", itemController.getItems)


/**
 * @swagger
 *  /api/item/get-items-with-price:
 *    get:
 *      summary: "가격대를 이용하여 물건 조회"
 *      description: "최소 최대가격을 이용해서 상품을 조회한다"
 *      tags: [Items]
 *      parameters:
 *      - in: query
 *        name: from
 *        required: true
 *        description: 최소가격
 *        schema:
 *          type: string
 *      - in: query
 *        name: to
 *        required: true
 *        description: 최대가격
 *        schema:
 *          type: string
 *      responses:
 *        "200":
 *          description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 삭제)
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                result:
 *                  type: string
 *                users:
 *                  type: object
 *                  example:
 *                    [
 *                      { "id": 1, "name": "유저1" },
 *                      { "id": 2, "name": "유저2" },
 *                      { "id": 3, "name": "유저3" }
 *                    ]
 */
itemRouter.get("/get-item-with-price", itemController.getItemWithPrice)

/**
 * @swagger
 *  /api/item/get-items-with-title:
 *    get:
 *      summary: "물건명을 이용하여 물건 조회"
 *      description: ""
 *      tags: [Items]
 *      parameters:
 *      - in: query
 *        name: title
 *        required: true
 *        description: 물건에 포함된 이름
 *        schema:
 *          type: string
 *      responses:
 *        "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 삭제)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                users:
 *                  type: object
 *                  example:
 *                    [
 *                      { "id": 1, "name": "유저1" },
 *                      { "id": 2, "name": "유저2" },
 *                      { "id": 3, "name": "유저3" }
 *                    ]
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
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 삭제)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                users:
 *                  type: object
 *                  example:
 *                    [
 *                      { "id": 1, "name": "유저1" },
 *                      { "id": 2, "name": "유저2" },
 *                      { "id": 3, "name": "유저3" }
 *                    ]
 */

itemRouter.get("/get-category-data", itemController.getCategoryData)

/**
 * @swagger
 *  /api/item/get-item-with-category:
 *   get:
 *    summary: "현재 선택한 카테고리에 맞는 물건 선택"
 *    description: ""
 *    tags: [Items]
 *    parameters:
 *    - in: query
 *      name: category
 *      required: true
 *      description: 물건의 카테고리
 *      schema:
 *        type: string
 *    responses:
 *      "200":
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 삭제)
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              ok:
 *                type: boolean
 *              users:
 *                type: object
 *                example:
 *                  [
 *                    { "id": 1, "name": "유저1" },
 *                    { "id": 2, "name": "유저2" },
 *                    { "id": 3, "name": "유저3" }
 *                  ]
 */

itemRouter.get("/get-item-with-category", itemController.getItemWithCategory)

/**
 * @swagger
 *  /api/item/get-item-detail:
 *   get:
 *    summary: "상품 상세정보"
 *    description: ""
 *    tags: [Items]
 *    parameters:
 *    - in: query
 *      name: id
 *      required: true
 *      description: 상품의 아이디
 *      schema:
 *        type: string
 *    responses:
 *      "200":
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 삭제)
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              ok:
 *                type: boolean
 *              users:
 *                type: object
 *                example:
 *                  [
 *                    { "id": 1, "name": "유저1" },
 *                    { "id": 2, "name": "유저2" },
 *                    { "id": 3, "name": "유저3" }
 *                  ]
 */

itemRouter.get("/get-item-detail", itemController.getItemDetail)

module.exports = itemRouter