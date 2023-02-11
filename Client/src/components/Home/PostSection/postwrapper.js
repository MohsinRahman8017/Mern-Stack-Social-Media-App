import {useEffect, useState ,useRef} from "react";
import { useNavigate } from "react-router-dom";
import Comment from "./comment"
import Skeleton from '@mui/material/Skeleton';


let PostWrapper = (props) =>{

    const Navigate = useNavigate()

    let token = localStorage.getItem("token");
    const [ShowBtn,setShowBtn] = useState("Post-Data-more-btn-wrapper-Hide");
    const [LoveValue,setLove] = useState(false);
    const [LoveStyle,setStyle]  = useState("material-symbols-outlined Icon-empty");
    const [CommentWrapper,setCommentWrapper] = useState("Post-Comment-Wrapper-Hide");
    const [userId,setUserId] = useState()
    const [Avatar,setAvatar] = useState(props.Avatar)    

    let tagName = ""
    let path = "/Files/" + props.item.file

    // A Function For Expanding Video
    let expand = <button id="expand" onClick={(e)=>{
      props.postView()
      props.postId(props.item._id) 
  
    }} >Expand</button>

    // Creating an Image or Video Tag
     props.item.type == "image" ? tagName = <img src={path}  onClick={()=>{
      props.postView()
      props.postId(props.item._id) 

    }} className="Post-Data-photo" style={{objectPosition:"top",cursor:"pointer"}}  /> :
    tagName = <video src={path} id="video-player"  className="Post-Data-photo" style={{cursor:"pointer",objectFit:"contain",background:"black",}} controls></video>;

    useEffect(()=>{        
        if(LoveValue == true ){
            setStyle("material-symbols-sharp Icon-fill")
        }
        else if (LoveValue == false){
            setStyle("material-symbols-outlined Icon-empty")
        }
        props.GetLove()
    },[LoveValue])
    
    // Will Render On page Load
    useEffect(()=>{

        if(props.item.liked){
            setLove(true)
        }
        else if(!props.item.liked){
            setLove(false)
        }
        getUserdata()

    },[])

    // Love Button

    let BtnLove = (id) => {
     
        if(LoveValue == false){
            setLove(true)
            fetch("/reaction/PostLove",{
                method:"Post",
                headers:{
                    Authorization:token,
                    PostId:id
                },
            }).then((resp)=>{
                resp.json().then((data)=>{
                })
            })         
        }
        else if (LoveValue == true){
            setLove(false)  
            fetch("/reaction/DeletePostLove",{
                method:"delete",
                headers:{
                    Authorization:token,
                    Id:id              
                }
            }).then((resp)=>{
                resp.json().then((data)=>{
    
                })
            })
        }
    }
 
    //Logged User Data

    let getUserdata = async () => {
        fetch("/user/loggedUser",{
          method:"Get",
          headers:{
              Authorization:token
          }
        }).then((resp)=>{
          resp.json().then((data)=>{
            setUserId(data._id)

          })
        })
    }

    // Filter data 

    let data = props.datalove.filter((l)=>{
        return l.postId == props.item._id
    })


    let dataLength = data.length


    let BtnComment = () => {
        CommentWrapper == "Post-Comment-Wrapper-Hide" ?
        setCommentWrapper("Post-Comment-Wrapper"):
        setCommentWrapper("Post-Comment-Wrapper-Hide")        
    }

    let matchingId = userId == props.item.LoggedUserId._id


    let DirectToProfile = () => {
        Navigate(`/profile/${props.item.LoggedUserId._id}`)
    }

   const loading = props.isloading



    return(
        <>
        
            
            <div className="Post-Data-Wrapper"  >
            <div className="Post-Data-Header">
             <div className="Post-User-Profile">
                {
                    loading ?<Skeleton animation="wave" variant="circular" width={40} height={40} /> :
                    <div className="Post-Profile-Pic" onClick={DirectToProfile}  style={{backgroundImage:`url(/Files/${Avatar})`,backgroundSize:"cover",cursor:"pointer"}} ></div>

                }
                  <div className="Post-Name-Location">
                    <span style={{fontSize:"16px",fontFamily:"Acumin",fontWeight:"600"}}>{props.item.LoggedUserId.name}</span>   
                     <span style={{fontSize:"13px",fontFamily:"sans-serif"}}>Kpk Swat</span>
                </div>                                        
              </div>
            <div className={ShowBtn}>

                <div className="Post-Data-btn-more">
                <span className="material-symbols-outlined">bookmark</span>
                    <span id="Post-Data-btn-more-text">Saved </span>
                </div>

                {
                  matchingId ?   
                  <div className="Post-Data-btn-more">
                     <span className="material-symbols-outlined">edit</span>
                     <span id="Post-Data-btn-more-text">Edit Post</span>
                  </div> : ""
                }

               {
                matchingId ?
                <div className="Post-Data-btn-more" >
                    <span className="material-symbols-outlined">delete</span>
                    <span id="Post-Data-btn-more-text" >Delete</span>
                </div> : ""
               }

               
               
            </div>
            
            <div className="Post-Data-Profile_Action">
                <span className="material-symbols-outlined" onClick={()=>{
                    ShowBtn == "Post-Data-more-btn-wrapper-Hide" ? setShowBtn("Post-Data-more-btn-wrapper") : setShowBtn("Post-Data-more-btn-wrapper-Hide")

                }}>more_vert</span>
            </div>

            </div>

            {
              props.item.Input?<div className="Post-data-user-text" >
              <p>{props.item.Input}</p>
              </div> :''
            }
        
            <div style={{width:"100%",height:"auto",}}> 
            {               
            tagName
            }
            </div>

            {
                data.length > 0 ?
                <div className="postaction-count">
                    <div>
                        <img src="images/love.svg" height="20px"/>
                        <span style={{fontSize:"17px",fontFamily:"system-ui"}}>                      
                             {/* {LoveValue == true ? "You and ":""} */}
                             {dataLength}
                             {/* {LoveValue == true ? others :""}  */}
                            
                        </span>
                    </div>                  
                </div>
                :""

            }

            {
               data.length > 0 ?
                <span id="line-action"></span>:""
            }
             
            <div className="Post-Data-Actions">
               
                <div className="Post-User-action-btn">
                    <div className="Post-Love-Btn">
                     <span className={LoveStyle}  onClick={()=>BtnLove(props.item._id)}>favorite</span>     
                    </div>

                
                    <div className="Post-Love-Btn">
                     <span className="material-symbols-outlined" onClick={()=>BtnComment(props.item._id)} >comment</span>
                    </div>
                    
                </div>

                <div>
                <div className="Post-Love-Btn">
                    <span className="material-symbols-outlined">bookmarks</span>
                    </div>
                </div>

            </div>

            <div className={CommentWrapper}>

                <Comment
                 postId={props.item._id}
                 btncomment={BtnComment}
                />
            </div>
           </div>
        
            
        </>
    )
}

export default PostWrapper