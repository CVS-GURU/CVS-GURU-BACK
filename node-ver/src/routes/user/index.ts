const userRouter = require("express").Router()
const userController = require("./user.controller")

/**
 * @swagger
 *  /api/user/login:
 *    post:
 *      summary: "유저 로그인"
 *      description: "사용자의 로그인을 진행한다"
 *      tags: [Users]
 *      consumes:
 *      - application/json
 *      parameters:
 *      - in: body
 *        name: user_id
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: string
 *          example: wsadqeqe
 *      - in: body
 *        name: password
 *        required: true
 *        description: 비밀번호(sha256 암호화해서 전송)
 *        schema:
 *          type: string
 *          example: 03ac674216f3e15c761ee1a5e255f067.....
 *      responses:
 *        "200":
 *          description: 사용자 로그인
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
 *                        "USER_DATA": {
 *                          "USER_ID": "wsadqeqe",
 *                          "USER_NAME": "명성",
 *                          "ACCESS_TOKEN": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....",
 *                          "REFRESH_TOKEN": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....",
 *                          "USER_EMAIL": "wsadqeqe@naver.com",
 *                          "USER_PROFILE_IMAGE": "https://ajakjsadjkdsf....",
 *                          "USER_NICKNAME": "명성"
 *                        }
 *                      }
 */
userRouter.post("/login", userController.login)

/**
 * @swagger
 *  /api/user/signup:
 *    put:
 *      summary: "회원가입"
 *      description: "사용자 회원가입"
 *      tags: [Users]
 *      consumes:
 *      - application/json
 *      parameters:
 *      - in: body
 *        name: user_id
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: string
 *          example: wsadqeqe
 *      - in: body
 *        name: password
 *        required: true
 *        description: 비밀번호(sha256 암호화해서 전송)
 *        schema:
 *          type: string
 *          example: 03ac674216f3e15c761ee1a5e255f067.....
 *      - in: body
 *        name: user_name
 *        required: true
 *        description: 사용자 이름
 *        schema:
 *          type: string
 *          example: 명성
 *      - in: body
 *        name: user_email
 *        required: true
 *        description: 사용자 이메일
 *        schema:
 *          type: string
 *          example: abcd@naver.com
 *      - in: body
 *        name: user_profile_image
 *        required: false
 *        description: 사용자 프로필사진
 *        schema:
 *          type: string
 *          example: 파일명.jpg...
 *      responses:
 *        "200":
 *          description: 회원가입 완료
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
 *                    example: "회원가입이 완료되었습니다."
 *                  data:
 *                    type: object
 *                    example:
 *                      {}
 */
userRouter.put("/signup", userController.signup)

/**
 * @swagger
 *  /api/user/id-check:
 *    post:
 *      summary: "회원아이디 가입여부 확인"
 *      description: "회원가입을 위한 아이디의 가입여부를 확인합니다."
 *      tags: [Users]
 *      consumes:
 *      - application/json
 *      parameters:
 *      - in: body
 *        name: user_id
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: string
 *          example: wsadqeqe
 *      responses:
 *        "200":
 *          description: 아이디 확인 완료
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
 *                    example: "가입이 가능한 아이디입니다."
 *                  data:
 *                    type: object
 *                    example:
 *                      {}
 */
userRouter.post("/id-check", userController.idCheck)

/**
 * @swagger
 *  /api/user/change-user-info:
 *    put:
 *      summary: "회원정보 변경"
 *      description: "회원의 닉네임, 이미지 사진 주소를 변경한다"
 *      tags: [Users]
 *      consumes:
 *      - application/json
 *      parameters:
 *      - in: header
 *        name: 토큰
 *        required: true
 *        description: 유저 토큰
 *        schema:
 *          type: string
 *          example: Bearer asjdkblaksdjf....
 *      - in: body
 *        name: user_nickname
 *        required: false
 *        description: 유저 닉네임
 *        schema:
 *          type: string
 *          example: 칠봉이
 *      - in: body
 *        name: user_profile_image
 *        required: false
 *        description: 유저 프로필사진 이름
 *        schema:
 *          type: string
 *          example: 123.jpg
 *      responses:
 *        "200":
 *          description: 회원정보 변경 완료
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
 *                    example: "회원정보가 변경되었습니다."
 *                  data:
 *                    type: object
 *                    example:
 *                      {}
 */
userRouter.put("/change-user-info", userController.changeUserInfo)

/**
 * @swagger
 *  /api/user/get-user-info:
 *    get:
 *      summary: "유저정보 조회"
 *      description: "access token을 이용해 유저의 정보를 조회한다"
 *      tags: [Users]
 *      consumes:
 *      - application/json
 *      parameters:
 *      - in: header
 *        name: token
 *        required: true
 *        description: 유저 토큰
 *        schema:
 *          type: string
 *          example: Bearer asjdkblaksdjf....
 *      responses:
 *        "200":
 *          description: 유저정보 조회 완료
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
 *                        "USER_DATA": {
 *                          "USER_ID": "wsadqeqe",
 *                          "USER_NAME": "명성",
 *                          "USER_EMAIL": "wsadqeqe@naver.com",
 *                          "USER_PROFILE_IMAGE": "https://ajakjsadjkdsf....",
 *                          "USER_NICKNAME": "명성"
 *                        }
 *                      }
 */
userRouter.get("/get-user-info", userController.getUserInfo)
module.exports = userRouter