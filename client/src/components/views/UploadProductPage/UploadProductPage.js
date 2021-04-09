import React,{useState} from 'react'
import {Typography, Button, Form ,Input} from 'antd';
import FileUpload from '../../utils/FileUpload';
const {TextArea}=Input;



const Interests =[
    {key:1, value:"친환경"},
    {key:2, value:"유기동물"},
    {key:3, value:"비건"},
    {key:4, value:"취약계층"}
]

function UploadProductPage() {

    const [Title, setTitle] =useState("");
    const [Description, setDescription]=useState("");
    const [Price, setPrice] = useState(0);
    const [Interest, setInterst]=useState(1);
    const [Image, setImage]=useState([]);


    const titleChangeHandler=(event)=>{
        setTitle(event.currentTarget.value);
    }

    const descriptionChangeHandler=(event)=>{
        setDescription(event.currentTarget.value);
    }


    const priceChangeHandler=(event)=>{
        setPrice(event.currentTarget.value);
    }
    

    const InterestsChangeHandler=(event)=>{
        setInterst(event.currentTarget.value);
    }
    return (
        <div style={{maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{textAlign:'center', marginBottom:'2rem'}}>
                <h2>위플 업로드</h2>

            </div>

        <Form>
            {/* DropZone */}
            <FileUpload/>

            <br/>
            <br/>
            <label>제목</label>
            <Input onChange={titleChangeHandler} value={Title}/>
            <br/>
            <br/>
            <label>내용</label>
            <TextArea onChange={descriptionChangeHandler} value={Description}/>
            <br/>
            <br/>
            <label>가격</label>
            <Input type="number" onChange={priceChangeHandler} value={Price}/>

            <br/>
            <br/>
            <select onChange={InterestsChangeHandler} value={Interest}>
                {Interests.map(item=>(
                     <option key={item.key} value={item.value}>{item.value}</option>
                ))}
               
                
             

            </select>
            <br/>
            <br/>
            <button>
                확인
            </button>
        </Form>
        </div>
    )
}

export default UploadProductPage
