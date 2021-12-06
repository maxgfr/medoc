import csv from 'csvtojson';

export const txtToJson = (
  headers: Array<string>,
  txt: string,
): Promise<Record<string, any>> => {
  console.log(txt);
  return new Promise(resolve => {
    csv({noheader: true, headers})
      .fromString(txt)
      .then((json: Record<string, any>) => {
        resolve(json);
      });
  });
};
