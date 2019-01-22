import express from 'express';

import { json } from 'body-parser';

import router from './route/index';

const app = express();
const port = process.env.PORT || 3006;

app.use(json());

app.use('/api/v1', router);


app.listen(port);

export default app;
