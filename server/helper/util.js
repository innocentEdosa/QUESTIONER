export default class Util {
  static printErr(errorArr) {
    const Temp = [];
    for (let i = 0; i < errorArr.length; i += 1) { Temp.push({ [errorArr[i].param]: errorArr[i].msg }); }
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
}
