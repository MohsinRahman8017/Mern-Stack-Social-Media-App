import "./bottomNavigation.css"
import {useNavigate,useLocation} from "react-router-dom"
import {useState,useEffect} from 'react'

let BottomNavigation = () => {
    const Navigate =  useNavigate()
    const location = useLocation()

    const [HomeIcon,setHomeIcon] = useState("outlined");
    const [ProfileIcon,setProfileIcon] = useState("outlined");
    const [bookmarkIcon,setbookmarkIcon] = useState("outlined");
    const [settingIcon,setsettingIcon] = useState("outlined");
  

    useEffect(()=>{
      if(location.pathname == "/"){
        setHomeIcon("sharp")
      }
      else if(location.pathname == "/profile" ){
        setProfileIcon("sharp")

    }           
    },[])
    
    return(
            <>
                <div className="Bottom-Navigation-Wrapper">
                    <ul>
                       <li>
                       <span className={`material-symbols-${HomeIcon}` } onClick={()=>{
                        Navigate("/")
                       }} >home</span>

                       </li>
                       <li>
                       <span className={`material-symbols-${"outlined"}`}>chat</span>
                       </li>
                       <li>
                       <span className={`material-symbols-${ProfileIcon}`} onClick={()=>{
                            Navigate("/profile")
                       }} >person</span>
                       </li>
                       <li>
                       <span className={`material-symbols-${bookmarkIcon}`}>bookmark</span>
                       </li>
                       <li>
                       <span className={`material-symbols-${settingIcon}`}>settings</span>
                       </li>
                        
                    </ul>
                </div>
            </>
    )
} 

export default BottomNavigation