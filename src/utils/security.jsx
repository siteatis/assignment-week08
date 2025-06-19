const allPwdWords =
  "road,peach,guitar,hotel,awareness,geese,football,contrast,charity,learning,village,grape,patience,science,giraffe,glass,bird,elbow,sheep,river,control,jaguar,history,surgery,insect,artichoke,apple,writing,potato,magazine,airport,king,property,driver,shirt,idea,horse,song,ladder,analysis,wood,banana,artisan,piano,guest,criminology,pizza,camera,audience,orange,desk,clothes,tooth,accident,tiger,youth,bread,homework,highway,diamond,poetry,donkey,prudent,speech".split(
    ","
  );

// Converts a password into a unique 18-bit number, or returns undefined if not valid
export function encodePassword(password) {
  if (typeof password !== "string") return undefined;
  if (allPwdWords.length !== 64) return undefined; // TODO: for dev only
  const pwdWords = password.split("-");
  if (pwdWords.length !== 3) return undefined;
  // TODO: refactor to do the below neatly, if time later
  let result = 0;
  for (let s of pwdWords) {
    const idx = allPwdWords.findIndex((x) => x == s);
    if (idx < 0) return undefined;
    result = (result << 6) + idx;
  }
  return result;
}

// Converts an 18-bit number into a unique password, or returns undefined if out of range
export function decodePassword(number) {
  if (!Number.isInteger(number)) return undefined;
  if (number < 0 || number >= 2 ** 18) return undefined;
  return (
    allPwdWords[(number >> 12) & 63] +
    allPwdWords[(number >> 6) & 63] +
    allPwdWords[number & 63]
  );
}
