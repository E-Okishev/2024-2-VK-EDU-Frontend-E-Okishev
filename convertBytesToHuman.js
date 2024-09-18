/*
 * В этом задании надо разработать функцию
 * `convertBytesToHuman`. Эта функция  должна принимать
 * аргумент `bytes` только числового типа.
 * На выходе функция должна отдать
 * человекопонятную строку, которая будет
 * отражать размер файла. Примеры использования:
 * `convertBytesToHuman(1024) === '1 KB';`
 * `convertBytesToHuman(123123123) === '117.42 MB';`
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

export default function convertBytesToHuman(bytes) {
  if (typeof bytes !== 'number' || bytes < 0 || isNaN(bytes)) {
    return false;
  }

  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) {
    return '0 B';
  }
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = (bytes / Math.pow(1024, i));
  let formattedValue;
  if (value % 1 === 0) {
    formattedValue = value;
  } else {
    formattedValue = value.toFixed(2);
  }
  return `${formattedValue} ${sizes[i]}`;
}
