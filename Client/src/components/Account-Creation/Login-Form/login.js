import "./login.css"

import {useNavigate} from "react-router-dom"
import { useState } from "react"
import { toast} from 'react-toastify';


let Login = () => {

    const Navigate = useNavigate()

    const [user,setUser] = useState({
        email:"",
        password:""
    })

    let HandleEvent = (e) => {
        const {name,value} = e.target

        setUser({...user,[name]:value})
    }

    const token = localStorage.getItem("token")

    let Login = (e) => {
        e.preventDefault()

        if(user.email && user.password){
            fetch("/user/login",{
                method:"Post",
                headers:{
                    "Accept" :"application/json",
                    "Content-Type" :"application/json"
                },
                body:JSON.stringify(user)
            }).then((resp)=>{
                resp.json().then((data)=>{
                    if(data.message == "Login Successfully"){
                        console.log(data)
                        toast.success(`${data.message}`,{
                            position: 'top-center',
                         })

                        localStorage.setItem("user",JSON.stringify(data.loggeduser))
                        localStorage.setItem("token",data.token)
                        window.location.href = "/";

                    }
                    else{
                        toast.error(`${data.message}`,{
                            position: 'top-center',
                         })
                    }
                })
            })
        }
        else{
            toast.warn(`Something Is Missing`,{
                position: 'top-center',
            })
        }
    }

    let Register = () => {
        Navigate("/register")
    }

    return(
            <>
            <div className="Login-Outer-Most-Wrapper">
             <div className="Login-Left-Outer-Wrapper">
                <div className="Login-Left-Text-Wrapper" style={{backgroundImage:`url(images/${"group4.jpg"})`,backgroundSize:"cover",backgroundPosition:"bottom"}}>
                    <div className="Filter-Photo">
                     <div className="Login-Left-Text">
                        <div className="Logo-Login">
                            <h2>Podkes</h2>
                        </div>
                        <div className="Tag-Line">
                             <p>Let's Bring The World Together</p>
                        </div>
                     </div>
                    </div>
                </div>
             </div>

             <div className="Login-Right-Outer-Wrapper">
                    <div className="Login-Main-Wrapper">
                        <div className="Login-Title">
                            <h2>Podkes</h2>
                        </div>
                        <div className="Login-Form-Wrapper">
                            <form>
                                <div className="Login-Input">
                                    <span class="material-symbols-outlined">mail</span>
                                    <input type="email" placeholder="Email or Phone Number" name="email" onChange={HandleEvent} />
                                </div>
                                
                                <div className="Login-Input">
                                    <span class="material-symbols-outlined">lock</span>
                                    <input type="password" placeholder="Password" name="password" onChange={HandleEvent} />
                                </div>

                                <div className="Login-Input">
                                   <button className="Register-Action" onClick={Login}>LOGIN</button>
                                </div>
                            </form>

                           
                            <div className="others-info">
                              <div className="others-Login">
                                <h2>or </h2>
                              </div>

                                <div className="Login-Input" style={{height:"32%"}} >
                                    <button className="Register-Action" onClick={Register} >REGISTER</button>
                                 </div>

                                 <div className="Forgot-Password">
                                   <h3>Forgot Password ?</h3>
                                 </div>  
                              </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
    )
}

export default Login