import express from 'express';

import { json } from 'body-parser';

import cors from 'cors';

import multer from 'multer';

import swaggerUi from 'swagger-ui-express';

import questionerDocument from '../swagger.json';

import router from './route/index';

import { Upload } from './middleware/upload';

import { cloudinaryConfig } from './middleware/cloudinary';

const app = express();
const port = process.env.PORT || 3006;

app.use(cors());
app.use(cloudinaryConfig);
app.use(json());
app.use(multer({ storage: Upload.fileStorage(), fileFilter: Upload.filesFilter }).single('images'));

app.use('/home', swaggerUi.serve, swaggerUi.setup(questionerDocument));
app.use('/api/v1', router);

app.listen(port);

export default app;
