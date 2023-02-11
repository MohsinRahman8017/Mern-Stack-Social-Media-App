import "./profile-post-section.css";
import {React,useEffect, useState,} from 'react';
import Userpost from "./userpost";



let Profile_Post_Section = ({ViewPost,postid,UserId}) => {

    let token =  localStorage.getItem("token")

    const [userPost,setUserPost] = useState([]);
    const [filterPost,setFilterPost] = useState()
    

    useEffect(()=>{
        getData()
    },[])

    let getData = () => {
        fetch(`/post/UserPost/${UserId}`,{
            method:"Get",
            headers:{
                Authorization:token
            }
        }).then((resp)=>{
            resp.json().then((data)=>{
                setUserPost(data) 
                setFilterPost(data)             
            })
        })
    }


    let Filter = (e) => {
        let result = filterPost.filter((item)=>{
           return item.type === e
        })
        setUserPost(result)
    }

    let FilterAll = (e) => {
        getData()
    }


  
    

  return(
            <>
                <div className="Post-Section-Filter-Wrapper">
                   <button onClick={FilterAll}>All</button>
                   <button onClick={()=>Filter("image")}>Photos</button>
                   <button onClick={()=>Filter("video")}>Videos</button>
                </div>

                <div className="Post-Area-Outer-Wrapper">
                    <div className="Post-Area-Outer-Wrapper-All">
                        
                        {
                            userPost?

                            userPost.map((item,index)=>{

                                return (
                                        <Userpost
                                         key={index}
                                         Item={item}
                                         ViewPost={ViewPost}
                                         postid={postid}

                                        />
                                    )

                            })
                            :<span style={{fontFamily:"Acumin",marginLeft:"37%",color:"var(--text-black)"}}>You Have'nt made any post yet</span>
                        }
                                     

                    </div>
                 
                </div>

                

            </>
    )
}
export default Profile_Post_Section