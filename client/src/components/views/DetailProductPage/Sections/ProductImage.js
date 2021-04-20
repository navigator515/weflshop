import React,{useState,useEffect} from 'react'
import ImageGallery from 'react-image-gallery'
function ProductImage(props) {

    const [Images, setImages] = useState([])
    useEffect(() => {
        
        if(props.detail.images && props.detail.images.length>0)
        {
            let images=[]
            props.detail.images.map(item=>{
                images.push({
                    original:`http://localhost:5000/${item}`,
                    thumbnail:`http://localhost:5000/${item}`
                })
            })
            setImages(images)
        }
    }, [props.detail])// props.detail 이 바뀔 때마다 useEffect 라이프 사이클 한번 더 실행하라는 의미 
    return (
        <div>
            <ImageGallery items={Images}/>

        </div>
    )
}

export default ProductImage
