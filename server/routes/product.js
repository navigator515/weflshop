//index.js 에서 파일 api 를 다 받기는 너무 코드가 길기때문에 나눠서 받는다 

const express = require('express');
const router= express.Router();
const multer = require('multer');
// const { Product } = require("../models/Product");

//=================================
//             Product
//=================================
//multer 라이브러리를 사용해서 파일 저장

var storage = multer.diskStorage({
    destination: function (req, file, cb) //어디에 파일이 저장되는지 설정 /upload 로
    {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) //uploads 디렉토리로 저장될때 파일 이름 지정하는 것
    {
      cb(null,`${Date.now()}_${ file.originalname }`)
    }
  })
   
  var upload = multer({ storage: storage }).single('file')




router.post('/image', (req,res) =>{

    //가져온 이미지를 저장을 해주면 된다.

    upload(req, res, (err) =>{
        if(err){
            return req.json({success:false, err})
        }
        return res.json({ success:true, filePath: res.req.file.path, fileName: res.req.file.filename})

    })

})


module.exports =router;