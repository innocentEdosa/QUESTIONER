import multer from 'multer';

import uuid from 'uuid/v4';

export default class Upload {
  static fileStorage() {
    const fileStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './images');
      },
      filename: (req, file, cb) => {
        cb(null, uuid() + file.originalname);
      },
    });

    return fileStorage;
  }

  static filesFilter(req, file, cb) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    }
    else {
      cb(null, false);
    }
  }
}
