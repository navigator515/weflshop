import React,{useState, useEffect} from 'react'
import {Typography, Button, Form ,Input} from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';
import { useSelector } from "react-redux";

import { withRouter } from 'react-router-dom';
import { FaFileExcel } from 'react-icons/fa';

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

function SimpleUploadProduct(props) {
    const user = useSelector(state => state.user)
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

        if(!Title|| !Description)
        {
            return alert('모든 값을 넣어주셔야 합니다.')
        }
        const body={
            //로그인된 사람의 ID 
            writer: user.userData._id,
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
                // props.history.push('/')
                alert("게시물 업로드에 성공 했습니다.")
                window.location.href = '/';
                
            }else{
                alert('게시물 업로드에 실패 했습니다.')
            }
        })
    }
    return (
        <div>
        {/* {attachment && (
            <div className="wefl_post">
            <div className="factoryForm__clear" onClick={onClearAttachmentClick}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
          />
          
        </div>
        </div>
      )} */}


<div style={{display:"flex",alignItems:"center", 
justifyContent:'center',
border:"solid  1px skyblue",
borderRadius:"6px"}}>
    <Form onSubmit={submitHandler}>
    {/* <label>제목</label> */}
            <Input onChange={titleChangeHandler} value={Title} placeholder={"제목"}/>
            <br/>
            
           
            <TextArea onChange={descriptionChangeHandler} value={Description}placeholder={"내용"}/>
            <Button htmlType="submit" style={{display:"flex",alignItems:"center", justifyContent:'center',margin:"auto" ,width:"100%"}}>
                확인
            </Button>
        </Form>
</div>
   
{/*       
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
      <label for="attach-file" className="factoryInput__label">
        
        <div className="plus_img">
        <span style={{textAlign:"center",margin:"auto"}}>Add photos</span>
          <FontAwesomeIcon icon={faPlus} style={{width:100, height:100}} />
          </div>
        
      </label>
        <textarea
          className="factoryInput__input"
          value={kweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow cursor" />
      </div>
     
      {/* //사진 첨부 기능은 넣지만 보여주지는 않는다  
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />
      
 </form> */}


</div>
    )
}

export default withRouter(SimpleUploadProduct)
