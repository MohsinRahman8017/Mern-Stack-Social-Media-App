import "./upload-post.css"
import {useState,useRef} from "react"
import { toast} from 'react-toastify';

let Upload_Post = (props) => {


    const token = localStorage.getItem("token");

    const [Image,setImage] = useState("")
    const [inputValue,setInputValue] = useState("")
    const [postContainer,setPostContainer] = useState("Main-Post-Container")
    const [VideoContainer,setVideoContainer] = useState("PostVideoContainer-Hide")
    const [fileType,setFileType] = useState()

    
    const ImageHandler = (e) => {
        const RenderImage = URL.createObjectURL(e.target.files[0]);
        const ImageFile = e.target.files[0];
        setImage({ RenderImage : RenderImage,ImageFile: ImageFile});

        if(ImageFile.type.includes("video/")){
            setPostContainer("Main-Post-Container-Hide");
            setVideoContainer("PostVideoContainer-display");   
            setFileType("video")
        }
        else{
            setPostContainer("Main-Post-Container")
            setVideoContainer("PostVideoContainer-Hide")
            setFileType("image")
        }


    }

    const InputHandler = (e) => {
        const inputValue = e.target.value;
        setInputValue(inputValue)
    }

    const [Loading,setLoading] = useState(false)

    const Post = (e) => {
         setLoading(true)
        
        e.preventDefault();

        const data =  new FormData();
        data.append("file",Image.ImageFile);
        data.append("Input",inputValue);
        data.append("type",fileType);

        fetch("/post/sharepost",{
            method:"POST",
            headers:{
                Authorization:token
            },
            body:data
        }).then((resp)=>{
            resp.json().then((data)=>{
                if(data.message == "Post Created Successfully"){
                    toast.success(`${data.message}`,{
                        position: 'bottom-left',
                    })
                    props.close()
                }
                else{
                    toast.error(`Something Wents Wrong`,{
                        position: 'bottom-left',
                    })
                }
                setLoading(false)

            })
        })

        setInputValue('')
        setImage('')
        
    }

   
 return(
            <>
           
                <form className="Upload-Post-Wrapper"  >
                    <div className="Header-upload">
                        <div className="Header-Upload-Left">
                            <span className="material-symbols-outlined"  onClick={props.close} style={{cursor:"pointer"}}>arrow_back</span>
                        </div>
                        <div className="Header-Upload-middle">
                           <span>Create Post</span>
                        </div>
                        <div className="Header-Upload-right">
                            <span className="material-symbols-outlined" onClick={props.close}>cancel</span>
                        </div>
                    </div>

                    <div className="Profile-Upload-Section">
                      <div className="Profile-Upload" style={{backgroundImage:`url(images/${"linkedIn.jpg"})`,backgroundSize:"cover"}}></div>
                      <div className="Profile-Upload-Name">
                         <span>Mohsin Rahman</span>
                         <div className="Profile-Upload-Select">
                             <span className="material-symbols-outlined">public</span>
                            <select>
                                <option>Public</option>
                                <option>Friends</option>
                                <option>Only me</option>
                            </select>

                         </div>
                      </div>
                    </div>

                    <div className="Main-Post-Section">
                      <div className="Post-Input-Wrapper">
                        <textarea placeholder="What's on your mind?" name="Input" value={inputValue} onChange={InputHandler}  />
                      </div>

                      <div className="Main-Post-Outer-Wrapper">
                         <div className={postContainer} style={{backgroundImage:`url(${Image.RenderImage})`,backgroundSize:"contain"}}>
                         </div>

                         <video className={VideoContainer} controls src={Image.RenderImage}>                           
                         </video>

                         <div className="Upload-Button">
                            <span className="material-symbols-outlined">image</span>
                            <h2 className="text-add-photo">Add Photo/Video</h2>
                            <input type="file" name="file" onChange={ImageHandler} />
                         </div>

                      </div>

                     
                    </div>

                    <div className="Post-Upload-Btn-Wrapper">

                        {
                            Loading ?
                            <button disabled >Loading...</button>
                            :
                            <button onClick={Post} >Upload</button>


                        }
                    </div>
                </form>
           

            </>
                               

    )
}

export default Upload_Post 