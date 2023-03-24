import puppeteer from 'puppeteer';
import delay from 'delay';
import {wallet} from './dataWallet.js';


(async () => {
  for(let i=0;i<wallet.length;i++){
 
  const options = { waitUntil: 'networkidle2' };
  const browser = await puppeteer.launch({headless: true}); // true : without browser debug , false : with browser debug
  const page = await browser.newPage();

  await page.goto('https://docs.google.com/forms/d/e/1FAIpQLSfcMvbL80h2rs8IFqmtHf87jtckZFdsbiI5cOeVN-yRSXbmmg/viewform', options);
  const typeAddress = await page.$('div.RH5hzf.RLS9Fe > div > div.o3Dpx > div.Qr7Oae > div > div > div.AgroKb > div > div.aCsJod.oJeWuf > div > div.Xb9hP > input');
  await typeAddress.type(`${wallet[i]}`);
  await typeAddress.dispose();
  const buttonClick = await page.$('div.RH5hzf.RLS9Fe > div > div.ThHDze > div.DE3NNc.CekdCb > div.lRwqcd > div > span > span');
  await buttonClick.click(), {waitUntil: 'domcontentloaded'};
  await buttonClick.dispose();
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  await delay(10000);
  console.log(`<< ${i+1} / ${wallet.length} | Wallet Address : ${wallet[i]} \n>> Response : Berhasil submit!\n`);

  await browser.close();
  await delay(2000);
}

})();

