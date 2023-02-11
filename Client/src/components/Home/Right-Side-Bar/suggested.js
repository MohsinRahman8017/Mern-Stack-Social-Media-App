import { useEffect, useState,x } from "react"
import {useNavigate, useParams} from "react-router-dom"
import "./suggested.css"
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';

let SuggestedUser = ({Item,isloading}) => {

    let {id} = useParams()

    // Token
    const token = localStorage.getItem("token")

    // User To Follow Id
    const UserId = Item._id

    // Setting Btn Text
    const[BtnFollow,setBtnFollow] = useState("Follow")

    // Setting Btn Class
    const[Class,setClass] = useState("Unfollow")

    useEffect(()=>{
        BtnFollow == "Follow" ? setClass("Unfollow") : setClass("Follow");
    },[BtnFollow])

    let HandleFollow = () => {

        if(BtnFollow == "Follow"){
            fetch("/user/followUser",{
                method:"Post",
                headers:{
                    Authorization:token,
                    userId:UserId
                }
            }).then((resp)=>{
                resp.json().then((data)=>{
                })
            })
        }
        else if (BtnFollow == "Unfollow"){
            fetch("/user/unfollowUser",{
                method:"delete",
                headers:{
                    Authorization:token,
                    userId:UserId
                }
            }).then((resp)=>{
                resp.json().then((data)=>{
                })
            })
        }


        BtnFollow == "Follow" ? setBtnFollow("Unfollow") : setBtnFollow("Follow");
        // BtnFollow == "Follow" ? setClass("Follow") : setClass("Unfollow");
    }

    // This UseEffect Will Run The Function on Page Load

    useEffect(()=>{
        GetFollowedUser()
    },[])

    // A Function To retrive Require Data of followed user

    let GetFollowedUser = () => {

        fetch("/user/getFollowedUser",{
            method:"get",
            headers:{
                Authorization:token,
                userId:UserId
            }
        }).then((resp)=>{
            resp.json().then((data)=>{

               if(data.followed == true){
                setBtnFollow("Unfollow")
               }
               else if(data.followed == false){
                 setBtnFollow("Follow")
               }
            })
        })

    }


    // Visit Profile


    const Navigate = useNavigate()

    let VisitProfile = () => {
        window.location.href = `/profile/${Item._id}`;

    }

    return(
        <>
         <div className="Suggestion-People">
            <div className="Suggestion-Profile">
                {
                    isloading ?
                    <Skeleton animation="wave" variant="circular" width={40} height={40}/>:
                    <div className="Suggestion-Profile-Pic" onClick={VisitProfile}  style={{backgroundImage:`url(/Files/${Item.profile.dp})`,backgroundSize:"cover",cursor:"pointer"}}>
                    </div>
                }
                

                <div className="Suggestion-User-Profile-Data">

                    {
                        isloading ? 
                        <Skeleton
                        animation="wave" height={10}width="80%"style={{ marginBottom: 6 }} />:
                        <div className="Main-Name">
                          <h3>{Item.name}</h3>
                        </div>
                    }

                    {
                        isloading ? 
                        <Skeleton
                        animation="wave" height={10}width="80%"style={{ marginBottom: 6 }} />:
                        <div className="User-Name">
                        <h4>{Item.username}</h4>
                    </div>
                    }
                   
                 
                </div>
            </div>
            <div className="Suggestion-Button">
            {
                isloading ? 
                <Button
                animation="wave" width="80%"style={{ padding: "8px 14px" }} />:
                <button className={Class} onClick={HandleFollow} >{BtnFollow}</button>      
            }
            </div>
         </div>
        </>
    )
}

export default SuggestedUser