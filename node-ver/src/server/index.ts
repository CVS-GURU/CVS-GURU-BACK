import 'module-alias/register';
import express from 'express'; 
import mysql from 'mysql2'

const app = express(); 
const port = 3031; 

// import mongoose from 'mongoose'; // 추가 
import cookieParser from 'cookie-parser'; 
const config = require('@config/key');

mysql.createConnection({
  host: 'localhost',
  user: 'cvs_user',
  password: 'Cvs1234!@#$',
  database: 'cvsguru'
})

app.use(express.json()); 
app.use(express.urlencoded({extended : true }));
app.use(cookieParser()); 

app.get('/', (req: express.Request, res: express.Response) => { 
  res.send('Hello World'); 
}); 

app.post('/api/ping', (req: express.Request, res: express.Response) => { 
  res.send('post test')  
});

app.listen(port, () => { 
  console.log(`app listening on port ${port} and mode ${config.dataMode}`); 
})
