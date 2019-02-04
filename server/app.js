import express from 'express';

import { json } from 'body-parser';

import path from 'path';

import cors from 'cors';

import multer from 'multer';

import router from './route/index';

import { Upload } from './middleware/upload';

import { cloudinaryConfig } from './middleware/cloudinary'

const app = express();
const port = process.env.PORT || 3006;

app.use(cors());
app.use(cloudinaryConfig);
app.use(json());
app.use(multer({ storage: Upload.fileStorage(), fileFilter: Upload.filesFilter }).single('images'));

app.use('/api/v1', router);

app.listen(port);

export default app;
