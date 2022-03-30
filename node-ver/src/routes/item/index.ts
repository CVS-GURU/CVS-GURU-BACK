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
 *        name: store
 *        required: false
 *        description: 편의점 종류
 *        schema:
 *          type: string
 *      - in: query
 *        name: from
 *        required: false
 *        description: 최소가격
 *        schema:
 *          type: string
 *      - in: query
 *        name: to
 *        required: false
 *        description: 최대가격
 *        schema:
 *          type: string
 *      - in: query
 *        name: category
 *        required: false
 *        description: 상품 종류
 *        schema:
 *          type: string
 *      - in: query
 *        name: title
 *        required: false
 *        description: 상품에 포함된 이름
 *        schema:
 *          type: string
 *      - in: query
 *        name: sort
 *        required: false
 *        description: 정렬순서
 *        schema:
 *          type: string
 *          example: price_desc | price_asc
 *      - in: query
 *        name: page
 *        required: false
 *        description: 페이지 넘버
 *        schema:
 *          type: string
 *          example: 1
 *      - in: query
 *        name: page_size
 *        required: false
 *        description: 한페이지에 노출 할 상품 수
 *        schema:
 *          type: string
 *          example: 10
 *      responses:
 *        "200":
 *          description: 파라미터로 보내는 값의 여부 및 내용에 따라 달라짐
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: string
 *                    example: "0000"
 *                  reason:
 *                    type: string
 *                    example: "success"
 *                  data:
 *                    type: object
 *                    example:
 *                      {
 *                          "HITS": 1,
 *                          "CONTENTS": [{
 *                          "ITEM_NAME": "도)백종원데리마요덮밥",
 *                          "ITEM_PRICE": "3900",
 *                          "ITEM_IMAGE": "http://bgf-cu.xcache.kinxcdn.com/product/8809196616079.jpg",
 *                          "ITEM_ID": "14947"
 *                          }]
 *                      }
 */
itemRouter.get("/get-items", itemController.getItems)

/**
 * @swagger
 *  /api/item/get-items-recently:
 *    get:
 *      summary: "최근 상품 조회"
 *      description: "입력날짜 순 최근 20개의 상품을 조회한다"
 *      tags: [Items]
 *      responses:
 *        "200":
 *          description: 입력날짜 순 최근 20개의 상품 조회
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: string
 *                    example: "0000"
 *                  reason:
 *                    type: string
 *                    example: "success"
 *                  data:
 *                    type: object
 *                    example:
 *                      {
 *                          "HITS": 1,
 *                          "CONTENTS": [{
 *                          "ITEM_NAME": "도)백종원데리마요덮밥",
 *                          "ITEM_PRICE": "3900",
 *                          "ITEM_IMAGE": "http://bgf-cu.xcache.kinxcdn.com/product/8809196616079.jpg",
 *                          "ITEM_ID": "14947"
 *                          }]
 *                      }
 */
itemRouter.get("/get-items-recently", itemController.getItemRecently)

/**
 * @swagger
 *  /api/item/get-category-data:
 *    get:
 *      summary: "제공 카테고리 조회"
 *      description: "현재 상품들의 카테고리들을 조회한다"
 *      tags: [Items]
 *      responses:
 *        "200":
 *          description: 현재 공통코드로 제공되는 카테고리를 제공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: string
 *                    example: "0000"
 *                  reason:
 *                    type: string
 *                    example: "success"
 *                  data:
 *                    type: object
 *                    example:
 *                      {
 *                        "HITS": 3,
 *                        "CONTENTS": [{
 *                            "CODE_ID": "CA_01",
 *                            "CODE_NAME": "도시락"
 *                          },
 *                          {
 *                            "CODE_ID": "CA_02",
 *                            "CODE_NAME": "김밥"
 *                          },
 *                          {
 *                            "CODE_ID": "CA_03",
 *                            "CODE_NAME": "샌드위치"
 *                          }
 *                        ]
 *                      }
 */
itemRouter.get("/get-category-data", itemController.getCategoryData)

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
 *        description: 컨텐츠 상세정보 노출
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                result:
 *                  type: string
 *                  example: "0000"
 *                reason:
 *                  type: string
 *                  example: "success"
 *                data:
 *                  type: object
 *                  example:
 *                    {
 *                        "HITS": 1,
 *                        "CONTENTS": [{
 *                        "ITEM_NAME": "도)백종원데리마요덮밥",
 *                        "ITEM_PRICE": "3900",
 *                        "ITEM_IMAGE": "http://bgf-cu.xcache.kinxcdn.com/product/8809196616079.jpg",
 *                        "ITEM_ID": "14947"
 *                        }]
 *                    }
 */

itemRouter.get("/get-item-detail", itemController.getItemDetail)

module.exports = itemRouter