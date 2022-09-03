import puppeteer from 'puppeteer'

async function scrapeTest(bot, userConfig, iteration){
  
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