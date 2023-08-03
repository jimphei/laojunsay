const cheerio = require("./src/libraries/cheerio-helper");
(async()=>{
    const url = 'https://zh.annas-archive.gs/slow_download/2eeabf68cf2ec30c003ac1effee62214/aHR0cHM6Ly9tb21vdC5ycy9kMS95LzE2OTEwOTQyMjQvMzAvZS96bGliMS9waWxpbWktemxpYi0xMTkwMDAwMC0xMTkyOTk5OS8xMTkwOTY0MX4vWFhYWFhYWFhYWFgv6ZW_55u45oCdLeWFqOS4ieWGjC3moZDljY4tY2hlbmppbjUtY29tLTIwMTMtY2hlbmppbjUtY29tLS1hbm5hcy1hcmNoaXZlLm1vYmk=';
    const reponse = await fetch(url);
    const content = await reponse.text()
    const $ = cheerio.load(content)
    console.log($('.main').find('.mb-4').find('a').attr('href'))
    // console.log(content)
})()
