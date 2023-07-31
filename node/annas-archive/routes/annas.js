var express = require('express');
var router = express.Router();
const ArchiveOfAnna  = require('../src/archive-of-anna')
router.post('/search', function(req, res, next) {
    const data = req.body
    const result = ArchiveOfAnna.search(data.keyword)
    result.then((res)=>{
        console.log(res)
    })
    res.json({
      title: '测试'
    })
  });
module.exports = router