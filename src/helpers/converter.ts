import csv from 'csvtojson';
import iconv from 'iconv-lite';
import jschardet from 'jschardet';

export const txtToJson = (
  headers: Array<string>,
  txt: string,
): Promise<Record<string, any>> => {
  return new Promise(resolve => {
    csv({noheader: true, headers})
      .fromString(txt)
      .then((json: Record<string, any>) => {
        resolve(json);
      });
  });
};

export const txtConverter = (input: string, outputFormat = 'utf8'): string => {
  return iconv
    .decode(iconv.encode(input, jschardet.detect(input).encoding), outputFormat)
    .toString();
};