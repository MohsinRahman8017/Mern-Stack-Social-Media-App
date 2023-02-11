
import "./profile_pic.css";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import CircularProgress from '@mui/material/CircularProgress';



let Profile_Display_Picture = ({btnEdit,avatar}) => {

    const token = localStorage.getItem("token");
    console.log(avatar)
    
    let avatarPic = `/Files/${avatar}`;

    let [RenderImage,setRenderImage] = useState();

    let [ImageFile,setImageFile] = useState();

    let [loading,setloading] = useState(false)

    let ProfileDP  = (e) => {

        let RenderImage  = URL.createObjectURL(e.target.files[0])

        setRenderImage(RenderImage)

        setImageFile(e.target.files[0])
    }

    let Save = (e) => {

        if(ImageFile){

            setloading(true)

            e.preventDefault();

            const data = new FormData();

            data.append("file",ImageFile);

            console.log(data)

            fetch("/user/UpdateProfilePic",{
                method:"put",
                headers:{
                    Authorization:token
                },
                body:data
            }).then((res)=>{
                res.json().then((data)=>{
                    setloading(false)
                    btnEdit()
                })
            })

        }
    }


    return(
        <>
          <div className="Profile_Picture_Wrapper" >
            <CancelIcon onClick={btnEdit} sx={{color:"red",fontSize:"30px",cursor:'pointer',position:"absolute",zIndex:"10",top:"10px",right:"10px"}} />
              <Avatar alt="Profile Pic" src={!RenderImage?avatarPic:RenderImage} sx={{height:"300px",width:"300px"}}  />

              <div className="btn_Dp_Wrapper" >
                <Button variant="contained" startIcon={<PhotoCamera />}  component="label">
                    Update 
                    <input hidden accept="image/*" onChange={ProfileDP}  multiple type="file" sx={{padding:"10px 20px"}} />
                </Button>
                {
                    !loading ?
                    <Button variant="contained" color="warning" onClick={Save}  component="label">Save</Button>
                    :
                    <Button variant="contained" color="warning"  component="label">Loading...</Button>

                }
              </div>
          </div>
        </>
    )
}

export default Profile_Display_Picture