var express = require('express');
var router = express.Router();
const ArchiveOfAnna  = require('../src/archive-of-anna')
router.post('/search', async (req, res, next) =>{
    const data = req.body
    const result = await ArchiveOfAnna.search(data.keyword)
    res.json(result)
    res.end()
  });
router.get('/detail',async(req,res,next)=>{
  const {md5: md5} = req.query
  const detail = await ArchiveOfAnna.fetch_by_md5(md5)
  res.json(detail)
  res.end()
})

router.post('/dowload',async(req,res,next)=>{
  const body = req.body
  console.log(body)
  res.end()
})
module.exports = router