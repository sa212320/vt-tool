import axios from 'axios';
import { parse } from 'node-html-parser';
const now = new Date().getTime();
const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRs8Klcb_60l5HWjUcIGZ7beZz8JKewYgONp7jZ40nGlC1YT6wgt1ATIfYXmWhmx7IKkGyC513L2CDt/pubhtml';

const getAdds = async () => {
  if (process.browser) {
    const result = await axios.get(url+`?${now}`);
    const titlesReg = /<tr.*?<\/tr>/g;
    const adds = result.data.match(titlesReg).map((doc)=>{
      const root = parse(doc);
      const docs = root.childNodes[0].childNodes;
      const row = parseInt(docs[0].childNodes[0]?.childNodes[0].rawText);
      const img = docs[1]?.childNodes[0]?.rawText;
      const url = docs[2]?.childNodes[0]?.rawText;
      return {row, img, url}
    }).filter((d)=>d.row && d.img.includes('https'));
    return adds;
  }
  return [];
};

export { getAdds };
