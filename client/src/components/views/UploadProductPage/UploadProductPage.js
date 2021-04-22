import React,{useState, useEffect} from 'react'
import {Typography, Button, Form ,Input} from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';
import RichTextEditor from '../RichTextEditor/RichTextEditor';


const {TextArea}=Input;


const Interests =[
    {key:1, value:"친환경"},
    {key:2, value:"유기동물"},
    {key:3, value:"비건"},
    {key:4, value:"취약계층"}
]

const Areas =[
    {key:1, value:"서울"},
    {key:200, value:"부산"},
    {key:250, value:"인천"},
    {key:280, value:"경기도"},
    {key:350, value:"강원도"}
]

function UploadProductPage(props) {

    const [Title, setTitle] =useState("");
    const [Description, setDescription]=useState("");
    // const [Price, setPrice] = useState(0);
    const [Images, setImages]=useState([]);

    const [Interest, setInterst]=useState(1);
    const [Area, setArea] =useState(1);

    const titleChangeHandler=(event)=>{
        setTitle(event.currentTarget.value);
    }

    const descriptionChangeHandler=(event)=>{
        setDescription(event.currentTarget.value);
    }


    // const priceChangeHandler=(event)=>{
    //     setPrice(event.currentTarget.value);
    // }
    

    const InterestsChangeHandler=(event)=>{
        setInterst(event.currentTarget.value);
    }

    const AreasChangeHandler=(event)=>{
        setArea(event.currentTarget.value);
    }

    const updateImages = (newImages) =>{
        setImages(newImages);
    }

    const submitHandler= (event)=>{
        event.preventDefault();

        if(!Title|| !Description|| !Interest || !Images)
        {
            return alert('모든 값을 넣어주셔야 합니다.')
        }
        const body={
            //로그인된 사람의 ID 
            writer: props.user.userData._id,
            title:Title,
            description:Description,
            // price:Price,
            images:Images,
            interest:Interest,
            area:Area
        }

        //서버에 채운 값들을 request로 보낸다 

        Axios.post('/api/product',body)
        .then(response=>{
            if(response.data.success){
                alert("게시물 업로드에 성공 했습니다.")
                props.history.push('/')
            }else{
                alert('게시물 업로드에 실패 했습니다.')
            }
        })
    }
    return (
        <div style={{maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{textAlign:'center', marginBottom:'2rem'}}>
                <h2>위플 업로드</h2>

            </div>
         
        <Form onSubmit={submitHandler}>
            {/* DropZone */}
            <FileUpload refreshFunction={updateImages} />

            <br/>
            <br/>
            <label>제목</label>
            <Input onChange={titleChangeHandler} value={Title}/>
            <br/>
            <br/>
            <label>내용</label>
            {/* <TextArea onChange={descriptionChangeHandler} value={Description}/> */}
            <RichTextEditor onChange={descriptionChangeHandler} value={Description}/>
            {/* <br/>
            
            <br/>
            <label>가격</label>
            <Input type="number" onChange={priceChangeHandler} value={Price}/> */}
            
            <br/>
            <br/>
            <select onChange={InterestsChangeHandler} value={Interest}>
                {Interests.map(item=>(
                     <option key={item.key} value={item.key}>{item.value}</option>
                ))}
               
            </select>
            <br/>
            <br/>
            <select onChange={AreasChangeHandler} value={Area}>
                {Areas.map(item=>(
                     <option key={item.key} value={item.key}> {item.value}</option>
                ))}
               
            </select>
            <br/>
            <br/>
            <Button htmlType="submit">
                확인
            </Button>
        </Form>
        </div>
    )
}

export default UploadProductPage
