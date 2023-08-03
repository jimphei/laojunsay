const cheerio = require("../src/libraries/cheerio-helper");
const getRealLink = async (url)=>{
    const reponse = await fetch(url);
     const content = await reponse.text()
     const $ = cheerio.load(content)
     return $('.main').find('.mb-4').find('a').attr('href')
 }
module.exports = getRealLink