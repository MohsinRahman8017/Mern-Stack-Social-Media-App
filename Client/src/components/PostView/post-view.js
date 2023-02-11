import { useEffect, useState } from "react";
import "./post-view.css";
import { toast} from 'react-toastify';

let Post_View = (props) => {
  let token =  localStorage.getItem("token");
  const [data,setdata] = useState();
  const [UserData,setUserData] = useState()
  const [ShowBtn,setShowBtn] = useState("more-btn-wrapper-Hide")
  
  
   const id = props.postid

    useEffect(()=>{
      getdata()
    },[id])

    let getdata = () => {
      fetch("/post/GetSingleUserPost",{
        method:"GET",
        headers:{
            Authorizaton:token,
            Id:id
        }
      }).then((resp)=>{
          resp.json().then((data)=>{
            setdata(data)
            setUserData(data.LoggedUserId)
          })
      })
    }
  
    let tagName = "";

     if(data){

      let path = "/Files/" + data.file
      // Creating an Image or Video Tag
      data.type == "image" ? tagName = <img src={path} className="Post_View_Photo_Video"  /> :
      tagName = <video src={path}  className="Post_View_Photo_Video" controls/>;
      
    }
   
    let ShowMore = () => {
      ShowBtn == "more-btn-wrapper-Hide" ? setShowBtn("more-btn-wrapper") : setShowBtn("more-btn-wrapper-Hide")
    }

    let Delete = () => {
      fetch("/post/deletePost",{
        method:"delete",
        headers:{
          Authorization:token,
          Id:id
        }
      }).then((resp)=>{
        resp.json().then((data)=>{
          setShowBtn("more-btn-wrapper-Hide")
          toast.success(data.message,{
            position: 'bottom-left',
          })
          props.ViewPost()

        })
      })
       
    }

    

    
    return(
            <>
                <div className="Post_View_Inner_Wrapper">
                    <div className="Post_View-Post_Wrapper">

                       { 
                          tagName
                       }
                       <span className="material-symbols-outlined" onClick={()=>{
                        props.ViewPost()
                        setShowBtn("more-btn-wrapper-Hide")
                        

                        }}>close</span>
                    </div>
                    {/* <div className="Post_View_Details_Wrapper">
                      <div className="Post_View_User_Header" >
                        <div className="Post_View_Profile_Details">
                            <img src="images/mohsin.jpg"/>
                            <div>
                                <span id="firstChild">{UserData?UserData.name:""}</span>
                                <span id="secondChild">3 November 2022</span>
                            </div>
                        </div>

                        <div className="Post-View_Profile_Action">
                          <span className="material-symbols-outlined" onClick={ShowMore}>more_vert</span>
                        </div>

                        <div className={ShowBtn}>
                            <div className="btn-more">
                             <span className="material-symbols-outlined">edit</span>
                              <span id="btn-more-text">Edit</span>
                            </div>
                            <div className="btn-more" onClick={Delete}>
                             <span className="material-symbols-outlined">delete</span>
                              <span id="btn-more-text" >Delete</span>
                            </div>
                          </div>
                      </div>
                      <div className="Post_View_User_Description">
                        <p>{data?data.Input:""}</p>
                      </div>
                      <div className="Post_View_Action_Btn_Wrapper">
                       <div className="Post_Action_Btn_Count">

                        <div className="Post_Action_Btn_Love">
                          <span className="material-symbols-outlined" style={{fontSize:"17px"}}>favorite</span>
                          <span>5</span>
                        </div>

                        <div className="Post_Action_Btn_Love">
                          <span>2</span>
                          <span id="smalltext" >comments</span>
                        </div>

                        <div className="Post_Action_Btn_Love">
                          <span>1</span>
                          <span id="smalltext">share</span>
                        </div>
                       </div>

                       <span id="under-line"></span>

                       <div className="Post_Action_Btn">
                        <div>
                          <span className="material-symbols-outlined" id="Icon-empty" onClick={(e)=>{
                              e.target.className == "material-symbols-outlined" ? e.target.className ="material-symbols-sharp":e.target.className = "material-symbols-outlined"
                              e.target.id == "Icon-empty" ? e.target.id = "Icon-fill" : e.target.id = "Icon-empty"

                          }}>favorite</span>
                          <span>Love</span>
                        </div>
                        <div>
                          <span className="material-symbols-outlined">comment</span>
                          <span>Comment</span>
                        </div>
                        <div>
                          <span className="material-symbols-outlined">share</span>
                          <span>Share</span>
                        </div>
                        
                      
                       </div>
                      <span id="under-line"></span>
                      </div>
  
                    </div> */}
                    
                </div>
               
            </>
    )
}
export default Post_View