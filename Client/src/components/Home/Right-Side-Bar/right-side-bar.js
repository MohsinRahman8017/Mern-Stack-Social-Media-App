import "./right-side-bar.css"
import {useEffect, useState} from "react";
import SuggestedUser from "./suggested"
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

let Right_Side_Bar =() => {

    const [RecommendedUser,setUsers] = useState([]);
    const [loading,setLoading] = useState(false)

    const token = localStorage.getItem("token")

    useEffect(()=>{
        GetUser()
    },[])

    let GetUser = () => {

        setLoading(true)

        fetch("/user/GetLimitData",{
            method:"get",
            headers:{
                Authorization:token
            }
        }).then((resp)=>{
            resp.json().then((data)=>{
                setUsers(data)
                setLoading(false)
            })
        })

    }


    return(
            <>
                <div className="right-sidebar-wrapper">
                    <div className="right-message-search-wrapper">
                        <div className="right-Search-wrapper">
                            <span className="material-symbols-outlined">search</span>
                            <input type="text" placeholder="Search Here"/>
                        </div>

                        <div className="right-Nav-Menu-Tab">
                           <span className="material-symbols-outlined">notifications</span>
                        </div>
                       
                    </div>

                    <div className="Suggestions-Wrapper">
                        <div className="Suggestions-Inner-Wrapper">
                            <div className="Suggestion-Title">
                                <h2>Suggestions For You</h2>
                                <h3>See All</h3>
                            </div>

                            {
                                RecommendedUser && RecommendedUser.map((item,index)=>{
                                    return(
                                         <SuggestedUser 
                                         key={index}
                                         Item={item}
                                         isloading={loading}
                                         />
                                      )
                                })
                            }

                            
                            
                           
                        </div>
                    </div>
                </div>
            </>
    )
}

export default Right_Side_Bar