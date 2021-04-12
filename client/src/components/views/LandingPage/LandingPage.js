import React,{useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios';
import {Icon,Col,Row, Card} from "antd"; 
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider'
import CheckBox from '../LandingPage/Sections/CheckBox'
import {area} from './Sections/Datas'


function LandingPage() {

    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit]= useState(4);
    const [PostSize, setPostSize] = useState(0)

    useEffect(() => {


        let body ={
            skip:Skip,
            limit:Limit
        }

        getProducts(body)
        

    }, [])

//반복되는 axios 기능이라 따로 함수로 구현 한다 
    const getProducts=(body)=>{
        axios.post('/api/product/products', body)
        .then(response =>{
            if(response.data.success){
                console.log(response.data)
                if(body.loadMore){
                    setProducts([...Products, ...response.data.productInfo])
                }else{
                    setProducts(response.data.productInfo)
                }
                setPostSize(response.data.postSize)
            }else{
                alert('데이터를 가져오는데 실패 했습니다.')
            }
        })
    }


    //더보기 눌렀을 때 request 전송 
    const loadMoreHandler = ()=>{

        let skip = Skip + Limit
        
        let body={
            skip : skip,
            limit:Limit,
            loadMore:true
        }

        getProducts(body)
        setSkip(skip)

    }

    const renderCards = Products.map((product, index)=>{

        console.log('product', product)
        return <Col lg={6} md={8} xs={24} key={index}>
            <Card
                cover={<ImageSlider images={product.images}/>

                }
            >
                <Meta
                    title={product.title}
                    description={product.description}
                />

            </Card>
        </Col>
    })


    return (
       <div style={{width:'75%', margin: '3rem auto'}}>
           <div style={{textAlign:'center'}}>
               <h2>Let's WEFL <Icon type="rocket"/></h2>
               
           </div>
          

          {/* Filter */}
          {/* CheckBox */}
          <CheckBox list={area}/>
          {/* RadioBox */}
          {/* Search */}

        <Row gutter={[16,16]}>
            {renderCards}
        </Row>


        {PostSize >= Limit &&
          <div style={{display:'flex', justifyContent:'center'}}>
                <button onClick={loadMoreHandler}>더보기</button>
            </div>
        }
          

       </div>
    )
}

export default LandingPage
