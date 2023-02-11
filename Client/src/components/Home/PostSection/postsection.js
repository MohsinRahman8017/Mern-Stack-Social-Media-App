import "./postsection.css";
import {useEffect, useState ,useRef} from "react";
import Post_View from "../../PostView/post-view";
import PostWrapper from "./postwrapper"
import CircularProgress from '@mui/material/CircularProgress';


let PostSection = (props) => {


  const [postMedia,setPostMedia] = useState([]);
  const [PostView,setPostView] = useState("Post-View-Outer-Wrapper-Hide");
  const [PostId,setPostId] = useState("");
  const [lovedata,setloveData] = useState([]);
  const [loading,setloading] = useState(false)

 
  let token = localStorage.getItem("token");

  useEffect(()=>{
    getdata()
    GetPostLove()
  },[])

  let getdata = () => {
    setloading(true)
     fetch("/post/GetAllData",{
        method:"GET",
        headers:{
          Authorization:token
        }
     }).then((resp)=>{
        resp.json().then((data)=>{
          setPostMedia(data.post)
          setloading(false)
        })
     })
  }

 
  let PostViewPop = () => {
    PostView == "Post-View-Outer-Wrapper-Hide" ? setPostView("Post-View-Outer-Wrapper"):setPostView("Post-View-Outer-Wrapper-Hide")
 }



 useEffect(()=>{
   GetPostLove()
 },[])


 let GetPostLove = () =>{
  fetch("/reaction/GetPostLove",{
      method:"get",
      headers:{
          Authorization:token,
      }
  }).then((resp)=>{
     resp.json().then((data)=>{
       setloveData(data)
      })
    })
  }

 return(
            <>
              <div className="Post-Section-Wrapper">
                 <div  className="Post-Filter-Wrapper">
                    <div className="Post-Title">
                        <h2>Posts</h2>
                    </div>

                    <div className="Post-Filter-Buttons">
                        <ul>
                          <li>All</li>
                          <li>Photos</li>
                          <li>Videos</li>
                        </ul>
                    </div>
                 </div>

                 <div className="Post-Outer-Wrapper">
                  <div className="Post-Inner-Wrapper">   

                  {
                    
                    loading ? 
                    <CircularProgress/>:
                   
                      postMedia ? 
                      postMedia.map((item,index)=>{

                      return(
                           <PostWrapper                  
                           key={index}                      
                           postId={setPostId}
                           item={item}
                           postView = {PostViewPop}
                           Avatar={item.LoggedUserId.profile.dp}
                           datalove={lovedata}  
                           GetLove={GetPostLove}
  
                           />

                           
                        )
                      }):<span>Loading</span>
                       

                  }
                                    
                   

                 

                  </div>

                 </div>

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

export default PostSection