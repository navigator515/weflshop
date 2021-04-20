import React from 'react'
import {Descriptions, Button} from 'antd';
function ProductInfo(props) {

    const clickHandler=()=>{
        
    }

    return (
        <div>
            <Descriptions title="WEFL Info" bordered>
                <Descriptions.Item label="제목">{props.detail.title}</Descriptions.Item>
                <Descriptions.Item label="관심사">{props.detail.interest}</Descriptions.Item>
                <Descriptions.Item label="지역">{props.detail.area}</Descriptions.Item>
                <Descriptions.Item label="내용">{props.detail.descriptions}</Descriptions.Item>
            </Descriptions>
        <br/>
        <br/>
        <br/>

        <div style={{display:'flex', justifyContent:'center'}}>
            <Button size="large" shape='round'type='danger' onClick={clickHandler}>
                Add to mypage
            </Button>
        </div>


      </div>
    )
}

export default ProductInfo
