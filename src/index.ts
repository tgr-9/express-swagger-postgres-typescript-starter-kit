import 'reflect-metadata';
import express, { Application } from 'express';
import morgan from 'morgan';
import { json, urlencoded } from 'body-parser';
import boom from 'express-boom';
import swaggerUi from 'swagger-ui-express';
import Router from './routes';
import cors from 'cors';

const app: Application = express();

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(boom());
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(undefined, { swaggerOptions: { url: '/swagger.json', } }));
app.use('/api/v1', Router);
app.use('/', (req, res) => {
  res.send('<a href="/swagger">Swagger API</a>');
});

/* tslint:disable */
const http = require('http');
const httpServer = http.createServer(app);
/* tslint:enable */

httpServer.listen(8888, () => {
  // tslint:disable-next-line: no-console
  console.log('HTTP Server successfully started at port', 8888, 'and host', httpServer.address().address);
});
