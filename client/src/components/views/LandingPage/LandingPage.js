import React,{useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios';
import {Icon,Col,Row, Card} from "antd"; 
import {MdDelete} from 'react-icons/md'
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider'
import CheckBox from '../LandingPage/Sections/CheckBox'
import Radiobox from '..//LandingPage/Sections/RadioBox'
import {interest, area} from './Sections/Datas'
import SimpleUploadProduct from '../UploadProductPage/SimpleUploadProduct';


function LandingPage(props) {

    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit]= useState(6);
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        area: [],
        interest :[]
    })

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
        console.log('user!!!!!!!',props.user);
        console.log('product', product)
        return <Row gutter={16,16} key={index} style={{marginTop:"40px"}}>
            <div>
            
                    <p style={{border:"1px solid #e8e8e8", marginBottom:"0px",borderBottom:"0px",
                     borderTopLeftRadius:'3px',borderTopRightRadius:'3px',
                     padding:"10px"}}>
                        <span>{props.user.userData.name}</span> <span style={{marginLeft:"300px"}}>수정</span><span><MdDelete /></span></p>
                    <Card
                cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images}/> </a>

                }
            >
                <Meta
                   title={product.title}
                  description={product.description}
                     
                />
              
                  </Card>
                </div>
                {/* <div>
                    descripttion
                    <Meta
                        description={product.description}
                    />
                </div>
                <div>
                    댓글
                </div> */}
       
            

        </Row>
    })

    //서버에 요청할 때 filters 를 추가하여 보낸다
    // fiters 에는 category 값이 담겨 있고 
    //category의 해당 배열을 넘긴다 
    
    const showFilteredResults= (filters)=>{

        let body={
            skip : 0,
            limit:Limit,
            filters:filters
            
        }
        getProducts(body);
        setSkip(0);
    }


    const handleArea=(value)=>{
        const data =area;
        let array =[];

        for(let key in data){
            if(data[key]._id=== parseInt(value,10)){
                array=data[key].array;//ex [0,199]
            }
        }
        return array;
    }


    //category ( area or interst ) 에 따라서 (구분하여) 필터링할 수 있도록 구현
    //Filters 에는 area 배열과, interest 배열이 함께 있는데 
    // 그것을 category 인자로 구분하여서 fiters 값 ( [1,3,4] 등) 을 넣어준다.
    
    const handleFilters =(filters, category)=>{
        const newFilters = {...Filters};

        newFilters[category]=filters;//[1,2,3 ] 을 넣어줌 

        if(category==="area"){
            let areaValues= handleArea(filters)
            newFilters[category]= areaValues
        }

        showFilteredResults(newFilters)
        setFilters(newFilters)

    }
    return (
       <div style={{width:'75%', margin: '0rem auto'}}>
           <div style={{textAlign:'center', margin:'30px'}}>
               <h2>Let's WEFL <Icon type="rocket"/></h2>
               
           </div>
          <div>
              
          </div>

                {/* Filter */}
        
                {/* <Row gutter={[16,16]} style={{margin:'-22px'}}>
                    <Col lg={24} xs={24}> */}
                    {/* CheckBox */}
                        {/* <CheckBox  list={interest} handleFilters={filters => handleFilters(filters, "interest")}/> */}
                        {/* //handleFilters 는 CheckBox 의 state 를 위에 useState 에 저장하기 위해서 사용해야한다, */}
                    {/* </Col> */}
                    {/* <Col lg={12} xs={24}>
                        <Radiobox list={area}  handleFilters={filters => handleFilters(filters, "area")} />
                    </Col> */}
                {/* </Row> */}
         
          {/* RadioBox */}
          {/* Search */}

                <Row gutter={[16,16]}>
                <SimpleUploadProduct />
                    {renderCards}
                </Row>


                {PostSize >= Limit &&
                <div style={{display:'flex', justifyContent:'center' ,marginTop:'15px'}}>
                        <button onClick={loadMoreHandler}>더보기</button>
                    </div>
                }
          

       </div>
    )
}

export default LandingPage
