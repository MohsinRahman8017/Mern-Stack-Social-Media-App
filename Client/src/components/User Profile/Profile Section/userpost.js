import { useState } from "react"


let  Userpost = ({Item,ViewPost,postid}) =>{

    const [PhotoWrapper,setPhotoWrapper] = useState("Photo-Post-Wrapper");

    let item = Item

    const path = "/Files/" + item.file ;

    let tagName = <img src={path} className={PhotoWrapper} key={item._id}  onClick={()=>ViewPost(item._id)} />;

    // Creating an Image or Video Tag

    item.type == "image" ? tagName = <img src={path} className={PhotoWrapper}  key={item._id} onClick={()=>ViewPost(item._id)}   /> :

    tagName = <div className={PhotoWrapper}><video src={path} key={item._id} className="video-container" onClick={()=>ViewPost(item._id)}  />

    <span className="material-symbols-outlined"   >play_arrow </span>
    </div>
  return (
            <>
            {
                tagName 
            }
            </>
  )
}

export default Userpost