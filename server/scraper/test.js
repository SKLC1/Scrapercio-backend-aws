import puppeteer from 'puppeteer'
import readline from 'readline'

async function scrapeTest(bot, userConfig, iteration){

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox','--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  
  try {
    await page.goto('https://www.linkedin.com/')
    // login
    await page.click(".nav__button-secondary")
    await page.waitForTimeout(1000 + randomWait());
    await page.type("#username",bot.email,{delay: 15})
    await page.type("#password",bot.password,{delay: 15})
    await page.waitForTimeout(1000 + randomWait());
    await page.click(".btn__primary--large")
    await page.waitForTimeout(5000 + randomWait());
    
    async function readLine() {
     const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
     return new Promise(resolve => {
        rl.question('Enter captcha: ', (answer) => {
          rl.close();
          resolve(answer)
        });
      }) 
    }
    
    const captcha = await readLine()
    await page.waitForTimeout(2000 + randomWait());
    console.log(captcha);
    const captcha_input = await page.waitForSelector("#input__email_verification_pin")
    await page.type(captcha_input, captcha,{delay: 15})
    await page.waitForTimeout(2000 + randomWait());
    const captcha_btn = await page.waitForSelector("#email-pin-submit-button")
    await page.click(captcha_btn)


  } catch(error) {
    throw error
  }
}

function randomWait(){
  const random = Math.random() * (2000 - 500) + 500;
  console.log(random);
  return random
}

export default scrapeTest