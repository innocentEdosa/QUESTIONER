import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.status(401).json({ status: '401', error: 'Not authenticated' });
  }
  const token = authHeader;
  let decodedtoken;
  try {
    decodedtoken = jwt.verify(token, 'thisismyusersecretsecret');
  } catch (err) {
    return res.status(401).json({ status: '401', error: 'Not authenticated' });
  }
  if (!decodedtoken) {
    return res.status(401).json({ status: '401', error: 'Not authenticated' });
  }
  req.user_id = decodedtoken.userId;
  req.isadmin = decodedtoken.isAdmin;
  next();
};
