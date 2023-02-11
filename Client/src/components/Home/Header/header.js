import "./header.css"
import {React, useEffect, useState} from "react"
import { useSelector, useDispatch  } from 'react-redux'
import { ThemeMode } from "../Left-Side-Bar/themeSlice"

let Header = () => { 

  let [themeBtn,setThemeBtn] = useState("Translate-Right")

  let storage = localStorage.getItem("ThemeMode")

  const dispatch = useDispatch()

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



    return(
            <>
              <div className="Header" >
                <div className="Header-logo">
                    <h2>Podkes</h2>
                </div>

                <div className="Header-Nav-Right">
                    <div className="Theme-Mode">
                       <div className="Theme-Button">
                         <span className="material-symbols-outlined" >light_mode</span>
                         <span className="material-symbols-outlined">dark_mode</span>
                         <button className={themeBtn} onClick={Translate} ></button>
                       </div>
                    </div>
                    <div className="Search-Here">
                      <span className="material-symbols-outlined">search</span>
                      <input type="text" placeholder="Search"/>
                    </div>


                    <div className="Header-Nav-Menu-Tab">
                    <span className="material-symbols-outlined">menu</span>
                    </div>
                </div>
              </div>
            </>
    )
}

export default Header