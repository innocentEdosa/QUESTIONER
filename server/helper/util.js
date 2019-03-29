export default class Util {
  static printErr(errorArr) {
    const Temp = {};
    errorArr.forEach((error) => {
      Temp[error.param] = [error.msg];
    });
    return Temp;
  }

  static errorCheck(error, res) {
    if (!error.isEmpty()) {
      const errorMessages = Util.printErr(error.array());
      return res.status(400).json({
        error: errorMessages
      });
    }
  }

  static checkId(id) {
    const reg = new RegExp('^[0-9]+$');
    if (!reg.test(Number(id))) {
      return false;
    }
    return true
  } 
}
