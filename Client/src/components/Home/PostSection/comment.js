import "./comment.css";
import {useEffect, useState} from "react"
import All_Comments from "./all-comments"

let Comment = (props) => {

    const [Avatar,setAvatar] = useState()

    // Logges User Token

    const token = localStorage.getItem("token");


    useEffect(()=>{
      getUserdata()
    },[])


    let getUserdata = () => {

        fetch("/user/LoggedUser",{
          method:"Get",
          headers:{
              Authorization:token
          }
        }).then((resp)=>{
          resp.json().then((data)=>{
            setAvatar(data.profile.dp)
          })
        })
    }

    //Comment Value

    const [sendstyle,setstyle] = useState("material-symbols-outlined")
    const [comVal,setComVal] = useState() ;
    const [comments,setComments] = useState([])


    let ComHandler = (e) => {
        setComVal(e.target.value)     
    }

    // Will Change Style of Send Button On ComVal Change

    useEffect(()=>{
        comVal ? setstyle("material-symbols-sharp") : setstyle("material-symbols-outlined")
    },[comVal])

    // Send Comment To Db

    let SendComment = () => {
        // if Comment Exist then Execute this

        if(comVal){

            const data = {input:comVal}

            fetch("/reaction/AddPostComment",{
                method:"POST",
                headers:{
                     Authorization:token,
                     postId:props.postId,
                     "Content-Type": 'application/json'            
                },
                body: JSON.stringify(data)
            }).then((resp)=>{
                resp.json().then((data)=>{
                    // data will return here
                })
                
             setComVal("")
             GetPostComment()
            })

        }
        
          // if Comment dont not Exist then do nothing

        else{
             console.log(false)
        }
    }

    // Getting Post Comment

    useEffect(()=>{
        GetPostComment()
    },[])

    let GetPostComment  =  () => {
        fetch("/reaction/GetPostComment",{
            method:"get",
            headers:{
                Authorization:token,
                postId:props.postId
            }
        }).then((resp)=>{
            resp.json().then((data)=>{
                setComments(data.comments)
            })
        })
    }

    let filterComments = comments.filter((com)=>{
    return com.postId == props.postId
    } )


    return(
            <>
                <form className="logged-user-comment">
                    <img src={`/Files/${Avatar}`} title="profile" />
                    <input type="text" name="Input" value={comVal} placeholder="Write a public comment" onChange={ComHandler} />  
                    <span className={sendstyle} title="Enter" onClick={SendComment} >send</span>                       
                </form>

                {
                    filterComments.map((item,index)=>{
                        return(
                            <All_Comments
                            key={index} 
                            item={item}
                            Avatar={item.userData.profile.dp}
                           
                             />
                        )
                    })
                }            
            
            </>
    )
}

export default Comment