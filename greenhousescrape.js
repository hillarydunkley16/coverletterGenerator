if (url.includes("boards.greenhouse.io")){
    async function scrapeJobSite(url) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        const jobTitle = await page.evaluate(() => {
            const jobTag = document.querySelector(".app-title");
            return jobTag.innerHTML;
        });

        const jobReqs = await page.evaluate(() => {
            const skillTag = document.querySelector(".content");
            let skills = [];
            // console.log(skillTag);  
            skillTag.forEach((skill) => {
                skills.push(skill.innerText);
            });
            return skills;
        });
        const jobInfo = { jobTitle, jobReqs };
        info.push(jobInfo);
        await browser.close();
        console.log(jobInfo);
    }
    scrapeJobSite(url); 
}