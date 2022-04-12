import 'module-alias/register';
import express from 'express';

const api = require('../routes');

const app = express();
const port = 3031;

import cookieParser from 'cookie-parser';
const cors = require('cors');
const config = require('@config/key');

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', api);

const { swaggerUi, specs } = require('../../middleware/Swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World');
});

app.post('/api/ping', (req: express.Request, res: express.Response) => {
  res.send('post test');
});

app.listen(port, () => {
  console.log(`app listening on port ${port} and mode ${config.dataMode}`);
});
