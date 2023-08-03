const scrapeJobSite = require('./main.js'); 

const prompt = require('prompt-sync')(); 
// const url = prompt('paste job posting url here: '); 
const resumeParse = require('./resumeParse.js'); 

async function evaluate(){
  const url = prompt('paste job posting url here: '); 
  const filePath = './HDunkley-Resume.pdf';
  // Call resumeParse and scrapeJobSite with appropriate parameters and await the results
  const [info, resume] = await Promise.all([scrapeJobSite(url), resumeParse(filePath)]);

  console.log(info); 
  console.log(resume); 
  // console.log('Common Words:', commonWords);
}


evaluate(); 