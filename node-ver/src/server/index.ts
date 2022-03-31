import 'module-alias/register';
import express from 'express'; 

const api = require('../routes')

const app = express(); 
const port = 3031; 

import cookieParser from 'cookie-parser'; 
const cors = require("cors")({
  origin: '*', // 출처 허용 옵션
  credential: 'true' // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
})
const config = require('@config/key');

app.use(cors)
app.use(express.json()); 
app.use(express.urlencoded({extended : true }));
app.use(cookieParser());

app.use('/api', api)

const { swaggerUi, specs } = require('../../middleware/Swagger')

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))

app.get('/', (req: express.Request, res: express.Response) => { 
  res.send('Hello World'); 
});

app.post('/api/ping', (req: express.Request, res: express.Response) => { 
  res.send('post test')  
});

app.listen(port, () => {
  console.log(`app listening on port ${port} and mode ${config.dataMode}`); 
})
