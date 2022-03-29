import swaggerUi from "swagger-ui-express"
import swaggereJsdoc from "swagger-jsdoc"

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "CVS-GURU",
      description:
        "편그루 API입니다.",
    },
    servers: [ 
      {
        url: "http://localhost:3031", // 요청 URL
      },
    ],
  },
  apis: ["src/routes/*.ts", "src/routes/user/*.ts"], //Swagger 파일 연동
}
const specs = swaggereJsdoc(options)

module.exports = { swaggerUi, specs }