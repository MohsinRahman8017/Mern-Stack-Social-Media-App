
import {useEffect, useState} from 'react'

import "./all-comments.css"

let All_Comments = (props) => {


    const [users,setuser] = useState({})

    const token = localStorage.getItem("token")

    useEffect(()=>{
        setuser(props.item.userData)
    },[])


    return(
            <>
                <div className="all-comments">
                    <img src={`/Files/${props.Avatar}`} title="profile" />
                    <div className="commented-div">
                        <span id="nam" >{users.name}</span>
                        <span id="com" >{props.item.input}</span>   
                    </div>
                    <span className="material-symbols-sharp" id="btn-dot-com" >more_horiz</span>
                    
                </div> 
            </>
    )
}

export default All_Comments