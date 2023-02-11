import "./register.css"

import {Form, useNavigate} from "react-router-dom"
import { useState } from "react"
import { toast} from 'react-toastify';


let Register = () => {

    const Navigate = useNavigate()

    // My User Object 
    const [user,setUser] = useState({
            name:"",
            username:"",
            email:"",
            password:""
        }
    );

    // Handiling Event
    let HandleEvent = (e) => {

        const {name,value} = e.target

        setUser({...user,[name]:value })
    }

    //Register Function

    let Register = (event) => {
     
        event.preventDefault()
        if(user.name && user.username && user.email && user.password){

            fetch("/user/register",{
                method:"POST",
                headers:{
                    "Accept" :"application/json",
                    "Content-Type" :"application/json"
                },
                body:JSON.stringify(user)
            }).then((resp)=>{
                resp.json().then((data)=>{    
                  //Showing Error or Succes Message
                   if(data.message == "Sorry User Already Exist"){
                    toast.error(`${data.message}`,{
                        position: 'top-center',
                        })
                   }
                   else{
                    toast.success(`${data.message}`,{
                        position: 'top-center',
                        })
                    Navigate("/login")
                   }
                })
            })

        }
        else{
            event.preventDefault()
        }
      
      

    }


    //Naviagte To Login Page
    let Login = () => {
        Navigate("/login")
    }
    
    return(
            <>
             <div className="Register-Left-Outer-Wrapper">
                <div className="Register-Left-Text-Wrapper" style={{backgroundImage:`url(images/${"group4.jpg"})`,backgroundSize:"cover",backgroundPosition:"bottom"}}>
                    <div className="Register-Filter-Photo">
                     <div className="Register-Left-Text">
                        <div className="Register-Login">
                            <h2>Podkes</h2>
                        </div>
                        <div className="Tag-Line">
                             <p>Let's Bring The World Together</p>
                        </div>
                     </div>
                    </div>
                </div>
             </div>

             <div className="Register-Right-Outer-Wrapper">
                    <div className="Register-Main-Wrapper">
                        <div className="Register-Title">
                            <h2>Podkes</h2>
                        </div>
                        <div className="Register-Form-Wrapper">
                            <form >
                                <div className="Register-Input">
                                    <span className="material-symbols-outlined">account_circle</span>
                                    <input type="text" placeholder="Full Name" name="name" value={user.name} required   onChange={HandleEvent} />
                                </div>

                                <div className="Register-Input">
                                    <span className="material-symbols-outlined">person</span>
                                    <input type="text" placeholder="User Name"  name="username"  value={user.username} required onChange={HandleEvent}/>
                                </div>

                                <div className="Register-Input">
                                    <span className="material-symbols-outlined">mail</span>
                                    <input type="email" placeholder="Email or Phone Number"  name="email"  value={user.email} required onChange={HandleEvent}/>
                                </div>
                                
                                <div className="Register-Input">
                                    <span className="material-symbols-outlined">lock</span>
                                    <input type="password" placeholder="Password"  name="password"  value={user.password} required onChange={HandleEvent}/>
                                </div>

                                <div className="Register-Input">
                                   <button className="Register-Action" onClick={Register}>REGISTER</button>
                                </div>
                            </form>
                            <div className="Register-others-info">
                              <div className="Register-Login-or">
                                <h2>or </h2>
                              </div>

                                <div className="Register-Input" style={{height:"32%"}} >
                                    <button className="Register-Action" onClick={Login} >LOGIN</button>
                                 </div>
                              </div>
                        </div>
                    </div>
             </div>
            </>
    )
}

export default Register