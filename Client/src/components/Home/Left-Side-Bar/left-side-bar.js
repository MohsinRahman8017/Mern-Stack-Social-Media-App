
import "./left-side-bar.css"
import {React,useEffect,useRef,useState} from "react"
import {useNavigate ,useLocation} from "react-router-dom"
import { useDispatch  } from 'react-redux'
import { ThemeMode } from "./themeSlice"

import { toast} from 'react-toastify';


let Left_Side_Bar = (props) => {

  const [themeBtn,setThemeBtn] = useState("Translate-Right");
  const [userData,setUserData] = useState([]);
  const [HomeIcon,setHomeIcon] = useState("outlined");
  const [ProfileIcon,setProfileIcon] = useState("outlined");
  const [bookmarkIcon,setbookmarkIcon] = useState("outlined");
  const [settingIcon,setsettingIcon] = useState("outlined");
  const [user,setUser] = useState()
  const [Avatar,setAvatar] = useState("images/perosn.png")



  const Navigate =  useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const borderHome = useRef()
  const borderProfile = useRef()


  let token = localStorage.getItem("token")


  useEffect(()=>{
    
    setUser(JSON.parse(localStorage.getItem("user")))

    if(location.pathname == "/"){
      setHomeIcon("sharp")
      borderHome.current.style.borderRight = "2.5px solid blue"
      

    }
    else if(location.pathname == "/profile/:id" ){
      setProfileIcon("sharp") 
      borderProfile.current.style.borderRight = "2.5px solid blue"
    }
    
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
          setUserData(data)
          setAvatar(data.profile.dp)
        })
      })
  }

  
  let Translate = () => {

      if(themeBtn == "Translate-Left"){
        setThemeBtn("Translate-Right") 
        //Saving In Local Storage     
        localStorage.setItem("ThemeMode","LigtMode")
        //Saving in Redux Store 
        dispatch(ThemeMode('Light'))
      }
      else{
        setThemeBtn("Translate-Left")   
        //Saving In Local Storage     
        localStorage.setItem("ThemeMode","DarkMode")
        //Saving in Redux Store
        dispatch(ThemeMode('Dark'))
      }
  }


  let Logout = () => {

      localStorage.removeItem("token")
      Navigate("/login")
      toast.success(`Logout Successfully`,{
        position: 'top-center',
      })

  }


    return(
            <>
              <div className="Left-Side-Bar-Wrapper">
                <div className="Left-Side-Bar-Logo">
                    <h2>Podkes</h2>
                </div>

                <div className="Left-Side-Bar-Menu">
                    <div className="Left-Side-Bar-Menu-Title">
                        <h2>MENU</h2>
                    </div>

                    <div className="Left-Side-Bar-Actions">

                      <div className="Left-Side-Bar-Acions-Wrappers">
                        <div ref={borderHome} onClick={()=>{Navigate("/")}}>
                        <span className={`material-symbols-${HomeIcon}`}>home</span>
                         <h2 >Home</h2>
                         </div>   
                         
                       </div>

                      <div className="Left-Side-Bar-Acions-Wrappers">
                        <div>
                        <span className={`material-symbols-${"outlined"}`}>message</span>
                         <h2>Message</h2> 
                        </div>
  
                       </div>

                      <div className="Left-Side-Bar-Acions-Wrappers">
                        <div  ref={borderProfile} onClick={()=>{Navigate(`/profile/${user._id}`)}}>
                        <span className={`material-symbols-${ProfileIcon}`}>person</span>
                         <h2 >Profile</h2>  
                         </div>
 
                       </div>

                      <div className="Left-Side-Bar-Acions-Wrappers">
                        <div >
                        <span className={`material-symbols-${bookmarkIcon}`}>bookmark</span>
                          <h2>Saved Post</h2>   
                         </div>
                       </div>

                      <div className="Left-Side-Bar-Acions-Wrappers">
                        <div >
                        <span className={`material-symbols-${settingIcon}`}>settings</span>
                         <h2>Settings</h2>   
                         </div>
                       </div>

                    </div>

                </div>

                <div className="Left-Side-Bar-Account">
                  <div className="Side-Bar-Account-Wrapper">
                    <div className="Theme-Mode">
                       <div className="Theme-Button">
                         <span className="material-symbols-outlined" >light_mode</span>
                         <span className="material-symbols-outlined">dark_mode</span>
                         <button className={themeBtn} onClick={Translate} ></button>
                       </div>
                    </div>

                    <div className="User-Account-Wrapper">
                    <div className="Profile-Outer-line">
                            <div className="Profile-Image" style={{backgroundImage:`url(/Files/${Avatar})`,backgroundSize:"cover"}} >
                               
                            </div>
                        </div>
                        <h2>{userData.name}</h2>
                        <span className="material-symbols-outlined" onClick={Logout}>logout</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
    )
}

export default Left_Side_Bar