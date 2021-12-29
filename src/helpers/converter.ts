import csv from 'csvtojson';
import iconv from 'iconv-lite';

export const txtToArrJson = (
  headers: Array<string>,
  txt: string,
  delimiter = '\t',
): Promise<Array<Record<string, any>>> => {
  return new Promise(resolve => {
    csv({noheader: true, headers, delimiter})
      .fromString(txt)
      .then((json: Array<Record<string, any>>) => {
        resolve(json);
      });
  });
};

export const bufferToText = (
  buffer: Buffer,
  inputFormat = 'ISO-8859-1',
): string => {
  const input = iconv.decode(buffer, inputFormat);
  return input.toString();
};

export const urlify = (text: string): string => {
  var urlRegex = /<\/?[^>]+(>|$)/g;
  return text.replace(urlRegex, '');
};
