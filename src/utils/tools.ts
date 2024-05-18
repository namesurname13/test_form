// Функция для подсчета эмоджи в строке
export const countEmojis = (str: any, regex: RegExp): number => {
  return [...str.matchAll(regex)].length;
};
// /**
//  * Функция для подсчета эмоджи в строке
//  *
//  * @param {string} str - строка
//  * @param {RegExp} regex - регулярное выражние
//  * @returns {number} - кол-во эмоджи в строке
//  */
// export const countEmojis = (str: string, regex: RegExp): number => {
//   return Array.from(str.matchAll(regex)).length;
// };
