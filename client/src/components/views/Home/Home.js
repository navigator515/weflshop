import React from 'react'
import LandingPage from '../LandingPage/LandingPage'
import SideBar from '../SideBar/SideBar'
import './css/Home.css'
import {Row} from 'antd'

function Home(props) {
    return (
        <div className="container">
            <div className="feed" >
                
                <LandingPage user={props.user} product={props.product}/>
               
               
            </div>

           
                 <Row gutter={[16,16]}>
                    <SideBar/>
                 </Row>
                
          
        </div>
    )
}

export default Home
