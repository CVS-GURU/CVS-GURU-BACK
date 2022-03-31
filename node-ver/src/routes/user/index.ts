const userRouter = require("express").Router()
const userController = require("./user.controller")

/**
 * @swagger
 *  /api/user/login:
 *    post:
 *      summary: "유저 로그인"
 *      description: "사용자의 로그인을 진행한다"
 *      tags: [Users]
 *      parameters:
 *      - in: query
 *        name: user_id
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: string
 *          example: wsadqeqe
 *      - in: query
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
 *                          "USER_PROFILE_IMAGE": "https://ajakjsadjkdsf...."
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
 *      parameters:
 *      - in: query
 *        name: user_id
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: string
 *          example: wsadqeqe
 *      - in: query
 *        name: password
 *        required: true
 *        description: 비밀번호(sha256 암호화해서 전송)
 *        schema:
 *          type: string
 *          example: 03ac674216f3e15c761ee1a5e255f067.....
 *      - in: query
 *        name: user_name
 *        required: true
 *        description: 사용자 이름
 *        schema:
 *          type: string
 *          example: 명성
 *      - in: query
 *        name: user_email
 *        required: true
 *        description: 사용자 이메일
 *        schema:
 *          type: string
 *          example: abcd@naver.com
 *      - in: query
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

userRouter.get("/id-check", userController.idCheck)
module.exports = userRouter