//index.js 에서 파일 api 를 다 받기는 너무 코드가 길기때문에 나눠서 받는다 

const express = require('express');
const router= express.Router();
const multer = require('multer');
const { Product } = require("../models/Product");


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




router.post('/', (req,res) =>{
    //받아온 정보들을 DB에 넣어준다.
    const product=new Product(req.body)

    product.save((err)=>{
        if(err) return res.status(400).json({success:false, err})

        return res.status(200).json({success:true});
    });
        
})

router.post('/products', (req,res)=>{

    // product collection 에 들어 있는 모든 게시물 정보를 가져오기

    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;




    /////여기 부터
    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {

            console.log('key', key)

            if (key === "area") {
                findArgs[key] = {
                    //Greater than equal
                    $gte: req.body.filters[key][0],
                    //Less than equal
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key];
            }

         
        }   
    }
 console.log('findArg',findArgs)
///여기까지 checked 된 값만 배열에 담아서 filter 기능을 추가한다. [1,2,3] 이면 서울 부산 인천
//find 에 findArgs 라는 객체를 넘겨주면 그에 맞게 Product를 찾아오게 된다. 
//filter 에서 key 는 area 혹은 interest 이다 
    Product.find(findArgs)
    .populate("writer")
    .skip(skip)
    .limit(limit)
    .exec((err,productInfo)=>{
        if(err) return res.status(400).json({success:false, err})

        return res.status(200).json({success:true, productInfo,
        postSize:productInfo.length
    })
    })

})


module.exports =router;