import React, {useState} from 'react'
import Dropzone from "react-dropzone";
import {Icon} from 'antd';
import axios from 'axios';


function FileUpload() {


    const[Images, setImages]= useState([]);

    const dropHandler =(files) =>{

        let formData = new FormData();

        const config={
            header: {'content-type': 'multipart/form-data'}//어떠한 타입인지 백엔드에서 받을 때 에러를 없이 받을 수 있게 헤더를 넣어서 보낸다 
        }

        formData.append('file',files[0]);

        axios.post('/api/product/image',formData, config)
        .then(response =>{
            if(response.data.success)//파일 저장 성공 
            {
                setImages([...Images,response.data.filePath])
            }else{
                alert('파일을 저장하는데 실패했습니다')

            }
        })

    }



    return (
        <div style={{display:'flex', justifyContent:'space-between'}}>
         <Dropzone onDrop={dropHandler}>
            {({getRootProps, getInputProps}) => (
                <div style={{width:300, height:240 , border:'1px solid lightgray',
                            display:'flex' , alignItems:'center', justifyContent:'center'
                        }}
                     {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Icon type="plus" style={{fontSize:'3rem'}}/>
                </div>
            
            )}
            </Dropzone>

            <div  style={{width:350, height:240, overflowX:'scroll'}}>

                    {Images.map((image, index) => (
                        <div key={index}>
                            <img style={{ minWidth:'300px', width:'300px', height:'240px'}}
                            src={`http://locallhost:5000/${image.filePath}`} />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default FileUpload
