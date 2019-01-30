import express from 'express';

import { json } from 'body-parser';

import path from 'path';

import multer from 'multer';

import router from './route/index';

import Upload from './middleware/upload';

const app = express();
const port = process.env.PORT || 3006;

app.use(json());
app.use(multer({ storage: Upload.fileStorage(), fileFilter: Upload.filesFilter }).single('images'));
app.use(express.static(path.join(__dirname, 'images')));

app.use('/api/v1', router);


app.listen(port);

export default app;
