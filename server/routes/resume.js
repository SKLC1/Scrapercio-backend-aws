import { config } from 'dotenv'
import express from 'express'
import convertToCSV from '../scraper/createCSV.js'
import scrapeEvents from '../scraper/eventsScraper.js'
import scrapePostsV2 from '../scraper/postsScraper.js'
import scrapeTest from '../scraper/test.js'
export const resumeRouter = express.Router()

resumeRouter.post('/scrape', async (req,res)=>{
  try {
    const scrapeResult = await scrapePostsV2({email: "fordjason363@gmail.com",password: "asdfasdf12345"}, req.body)
    if(req.body.config.getEvents === true){
     const resEvents = await scrapeEvents({email: "fordjason363@gmail.com",password: "asdfasdf12345"}, req.body)
     scrapeResult.push({events: resEvents})
    }
    console.log(`SCRAPE RES: ${scrapeResult}`);
    res.json(scrapeResult)
  } catch (error) {
    res.json({message: error.message})
  }
})

resumeRouter.post('/test', async (req,res)=>{
  try {
    const testRes = await scrapeTest({email: "danocohen333@gmail.com",password: "asdfasdf12345"}, req.body)
    res.json(testRes)
  } catch (error) {
    res.json({message: error.message})
  }
})

resumeRouter.post('/csv', async (req,res)=>{
  console.log(req.body.scrapedByPhantom.length);
  try {
    const res = await convertToCSV(req.body.scrapedByPhantom, req.body.getLocations)
    console.log(res);
    res.json(res)
  } catch (error) {
    res.json({message: error.message})
  }
})

