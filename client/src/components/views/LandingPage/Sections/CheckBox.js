import React,{useState} from 'react'
import {Collapse, Checkbox} from 'antd'

const {Panel}= Collapse;
function CheckBox(props) {

    const [Checked, setChecked] = useState([])

    const handleToggle=(value)=>{
        //누른 것의 Index를 구하고

        const currentIndex=Checked.indexOf(value)// index 가 없는 값이면 -1 을 반환
        //전체 Checked 된 State 에서 현재 누른 Checkbox 가 있다면

        const newChecked = [...Checked]
        //State 넣어준다
        if(currentIndex=== -1){
            newChecked.push(value)
            //빼주고
        }else{
            newChecked.splice(currentIndex, 1)
        }
        setChecked(newChecked);
        props.handleFilters(newChecked);

        

      
    }

    const renderCheckboxLists = () =>props.list && props.list.map((value,index)=>(
        <React.Fragment key={index}>
                <Checkbox onChange={()=>handleToggle(value._id)} checked={Checked.indexOf(value._id)=== -1 ? false : true}/>
                    <span>{value.name}</span>
         
        </React.Fragment>
    ))
    return (
        <div>
        <Collapse defaultActiveKey={['1']} >
            <Panel header="관심사" key="1">
           
            {renderCheckboxLists()}
            </Panel>
        </Collapse>
        </div>
    )
}

export default CheckBox
