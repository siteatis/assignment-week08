// We will give users an 18-bit password, which is better than nothing.
// We can't let the users choose their own password, because this system
// isn't actually secure, it's just a pastiche of security. And so if we
// let users choose their own password, they may inadvertently use one
// they've used elsewhere, thereby compromising it.

// In this app, it mightn't actually hurt us to store the real password in
// the DB. But we'll store its binary representation instead, for the
// learnings, err I mean to save a few bytes of storage.

const allPwdWords =
  "road,peach,guitar,hotel,awareness,geese,football,contrast,charity,learning,village,grape,patience,science,giraffe,glass,bird,elbow,sheep,river,control,jaguar,history,surgery,insect,artichoke,apple,writing,potato,magazine,airport,king,property,driver,shirt,idea,horse,song,ladder,analysis,wood,banana,artisan,piano,guest,criminology,pizza,camera,audience,orange,desk,clothes,tooth,accident,tiger,youth,bread,homework,highway,diamond,poetry,donkey,prudent,speech".split(
    ","
  );

export function createNewPassword() {
  const number = Math.floor(2 ** 18 * Math.random());
  return { number: number, password: decodePassword(number) };
}

export function checkPassword(password, number) {
  return decodePassword(number) === password;
}

// Converts a password into a unique 18-bit number, or returns undefined if not valid
// TODO: export needed for seed.js only...
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
function decodePassword(number) {
  if (!Number.isInteger(number)) return undefined;
  if (number < 0 || number >= 2 ** 18) return undefined;
  return (
    allPwdWords[(number >> 12) & 63] +
    allPwdWords[(number >> 6) & 63] +
    allPwdWords[number & 63]
  );
}
