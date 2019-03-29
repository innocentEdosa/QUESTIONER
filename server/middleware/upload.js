import multer from 'multer';

import Datauri from 'datauri';

import path from 'path';

class Upload {
  static fileStorage() {
    const fileStorage = multer.memoryStorage();
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

const dUri = new Datauri();
/** format the req file buffer and return a string blob */
const dataUri = (req) => { return dUri.format(path.extname(req.file.originalname).toString(),
  req.file.buffer) 
};

export { Upload, dataUri };

