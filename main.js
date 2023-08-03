const puppeteer = require('puppeteer');
const prompt = require('prompt-sync')();

const url = prompt("paste job posting here");
let info = new Set();

async function scrapeJobSite(url) {
    let jobTag, skills;

    if (url.includes("lever.co")) {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);

            jobTag = await page.evaluate(() => {
                const jobTagElement = document.querySelector(".posting-headline h2");
                return jobTagElement ? jobTagElement.innerText.toLowerCase() : null;
            });

            skills = await page.evaluate(() => {
                const skillTags = document.querySelectorAll(".posting-requirements.plain-list ul li");
                let skillsArray = [];
                skillTags.forEach((skill) => {
                    skillsArray.push(skill.innerText);
                });
                return skillsArray;
            });

            await browser.close();
        } catch (error) {
            console.error('Error scraping job posting:', error);
            return null;
        }
    } else if (url.includes("boards.greenhouse.io")) {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);

            jobTag = await page.evaluate(() => {
                const jobTagElement = document.querySelector(".posting-headline h2");
                return jobTagElement ? jobTagElement.innerHTML : null;
            });

            skills = await page.evaluate(() => {
                const skillTags = document.querySelectorAll(".posting-requirements.plain-list ul li");
                let skillsArray = [];
                skillTags.forEach((skill) => {
                    skillsArray.push(skill.innerText.to);
                });
                return skillsArray;
            });

            await browser.close();
        } catch (error) {
            console.error('Error scraping job posting:', error);
            return null;
        }
    }

    let jobInfo = { jobTag, skills };
    info.add(jobInfo);
    // console.log(info); 
    return info;
}

scrapeJobSite(url);
module.exports = scrapeJobSite; 

