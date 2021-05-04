import React from 'react'
import {Carousel} from 'antd';
import '../utils/ImageSliderCSS/ImageSlider.css'
function ImageSlider(props) {
    return (
        <div>
     <Carousel  >
       {props.images.map((image, index) => (
                <div key={index}>          
                      <img style={{width:'100%', maxHeight:"600px"}} 
                         src={`http://localhost:5000/${image}`}/>
    
                </div>

           )

       )}
      </Carousel>
            
        </div>
    )
}

export default ImageSlider
