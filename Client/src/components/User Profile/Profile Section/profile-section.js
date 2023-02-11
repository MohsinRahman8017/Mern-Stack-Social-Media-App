import "./profile-section.css"
import Profile_Post_Section from './profile-post-section'
import {useEffect, useState} from "react"
import {useNavigate,useParams} from "react-router-dom"
import Upload_Post from "../Upload-Posts/upload-post"
import Post_View from "../../PostView/post-view"
import Profile_Display_Picture  from "./profile_pic"
import { Button } from "@mui/material"



let Profile_Section = () => {

  const {id} = useParams();
  const user = localStorage.getItem("user");
  const parsedata = JSON.parse(user);
  const UserId = id
  console.log(UserId,"USER")

  let verifyUser = id == parsedata._id

  const InitialBanner = "/images/linkedcover2.jpg";
  const InitialProfile = "/images/perosn.png";

  let token = localStorage.getItem("token")

  const Navigate = useNavigate()
 
  const [ProfileBanner,setProfileBanner] = useState(InitialBanner);
  const [userData,setUserData] = useState([]);
  const [PostView,setPostView] = useState("Post-View-Outer-Wrapper-Hide");
  const [PicSection,setPicSection] = useState("Profile_Pic_Wrapper_Hide")
  const [PostId,setPostId] = useState("")
  const [Avatar,setAvatar] = useState(InitialProfile)
  const [loading,setloading] = useState(false)

  const[BtnFollow,setBtnFollow] = useState("Follow")

    // Setting Btn Class
    const[Class,setClass] = useState("contained")

    useEffect(()=>{
        BtnFollow == "Follow" ? setClass("contained") : setClass("outlined");
    },[BtnFollow])

   

  //Banner Image
  let Banner_Profile = (e) => {
    const ImageRender = URL.createObjectURL(e.target.files[0]) 
    setProfileBanner(ImageRender)
  }

  //Profile Pic
  let Profile_Pic = (e) => {
    PicSection == "Profile_Pic_Wrapper_Hide" ?  setPicSection("Profile_Pic_Wrapper"):
    setPicSection("Profile_Pic_Wrapper_Hide")
  }

  //Post Uploading Section

  const [UploadSection,setUploadSection] = useState("Upload-Post-Outer-Wrapper-Hide")

  let ShowUpload = () => {
        setUploadSection("Upload-Post-Outer-Wrapper-Display") 
  }

  let CloseSection = () => {
     setUploadSection("Upload-Post-Outer-Wrapper-Hide")
  }

  useEffect(()=>{
    getUserdata()
  },[])


  let getUserdata = async () => {

    fetch(`/user/UserData/${id}`,{
      method:"Get",
      headers:{
        Authorization:token,
      }
    }).then((resp)=>{
      resp.json().then((data)=>{
        setUserData(data)
        setAvatar(data.profile.dp)
      })
    })
}


 let PostViewPop = (e) => {
    setPostId(e)
    PostView == "Post-View-Outer-Wrapper-Hide" ? setPostView("Post-View-Outer-Wrapper"):setPostView("Post-View-Outer-Wrapper-Hide")
 }

 let HandleFollow = () => {
  setloading(true)
  if(BtnFollow == "Follow"){
      fetch("/user/followUser",{
          method:"Post",
          headers:{
              Authorization:token,
              userId:UserId
          }
      }).then((resp)=>{
          resp.json().then((data)=>{
            setloading(false)
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
            setloading(false)
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
        console.log(data.followed,"FOLLOWED")

         if(data.followed == true){
          setBtnFollow("Unfollow")
         }
         else if(data.followed == false){
           setBtnFollow("Follow")
         }
      })
  })

}


    return(
            <>
                <div className="Profile-Section-Wrapper">                  
                    <div className="Profile-Top-Details-Section">
                      <div className="Profile-Banner-Outer-Wrapper">
                        <div className="Profile-Banner-Wrapper" style={{backgroundImage:`url(${ProfileBanner})`,backgroundSize:"auto",backgroundRepeat:"no-repeat" ,backgroundPositionX:"right"}}>
                          {
                            verifyUser && 
                            <div className="Edit-Profile-Banner">
                              <span className="material-symbols-outlined" id="btn-banner">edit</span>
                              <input type="file" className="Banner-Edit" onChange={Banner_Profile}/>
                          </div>
                          }
                        </div>
                      </div>
                      <div className="Profile-DP-Section">
                        <div className="Profile-DP-Wrapper">
                          <div className="Profile-DP" style={{backgroundImage:`url(/Files/${Avatar})`,backgroundSize:"cover"}}></div>
                          <div className="Profile-Personal-Info">
                              <span >{userData.name}</span>
                              <span>@{userData.username}</span>
                          </div>
                        </div>

                        <div className="Create-Post-Wrapper">
                          {
                            verifyUser ?
                            <div className="Create-Post-Btn-Wrapper" onClick={ShowUpload}>
                              <span className="material-symbols-outlined">add</span>
                              <span>Create Post</span>
                           </div> :
                           <Button variant={Class} onClick={HandleFollow} >{BtnFollow}</Button>

                          }

                          {
                            verifyUser && 
                            <span className="material-symbols-outlined" onClick={Profile_Pic} id="Edit" style={{position:"relative"}} >edit</span>

                          }

                         
                        </div>

                      </div>
                    </div>
                    <div className="Profile-Post-Section-Wrapper">
                      <Profile_Post_Section ViewPost={PostViewPop} UserId={id} />
                    </div>
                </div>

                <div className={UploadSection}>
                  <Upload_Post close={CloseSection} />
                 </div>
                 <div className={PicSection} >
                   <Profile_Display_Picture avatar={Avatar} btnEdit={Profile_Pic} />
                </div>

                 <div className={PostView}>
                        <Post_View 
                        ViewPost={PostViewPop}
                        postid={PostId} 
                          />
                </div>

              
                
            </>
    )
}

export default Profile_Section