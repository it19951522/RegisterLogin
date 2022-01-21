import React, {useState,useContext} from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import AuthContext from '../context/AuthContext';
import '../../Styles/Login.css'
//ort Image1 from '../../Images/Busreport_image.jpg'
export default function Loggin() {

    const[email,setEmail] = useState("");
    const [password, setpassword] = useState("");
    const {getLogged} = useContext(AuthContext);

   async function login(){
       
    if(email.length == 0){
        document.getElementById('mail_error').style.display = "block";
        // document.getElementById('password_error').style.display = "none";
        document.getElementById('exists').style.display = "none";
    }else{
        try{
            const loginData = {
                email,
                password,
            }

            await axios.post("http://localhost:8070/user/login",loginData).then(()=>{
                getLogged();
                window.location = "/profile";
            }).catch(()=>{
                document.getElementById('exists').style.display = "block";
                document.getElementById('mail_error').style.display = "none";
            })

        }catch(err){
            console.error(err);
        }
    }

        
    }


    return (
        <div  id="LoginPage">
            <div className="row" id="formlogin1">
                <div >
                   
                </div>
                <div  id="formlogin">
                    <h1 id="ltext1">LOGIN</h1>
                    <br></br>
                    
                    <input type="mail" className="form-control" name="Email" id="tb1" placeholder="E-mail Address"  
                    onChange={(e)=> setEmail(e.target.value)} value={email} required/>

                    <div id="mail_error" style={{ display: "none", color:"red", marginLeft:0,marginTop:-5 }}>please enter your email address</div><br />
                    
                    <input type="password" className="form-control" id="tb1" name="password" placeholder="Password"
                    onChange={(e)=> setpassword(e.target.value)} required/>
                      {/* <div id="password_error" style={{ display: "none", color:"red", marginLeft:0,marginTop:-5 }}>please enter password</div><br /> */}
                    
                    <div id="exists" style={{ display: "none", color:"red", marginLeft:0,marginTop:-5 }}>mail address or password is invalid</div><br />
                    
                    <a onClick={e=>{login()}}><div className="btn btn-info" id="ltext2">SIGN IN</div></a>
                    <br></br><br></br>
                    <a href="#"><div className="btn btn-info1" id="ltext3">Forgot password ?</div></a>
                    <br></br><br></br>
                    
                   <Link to="/register" className="regLink" id="ltext4">Create an Account</Link>

                </div>
                
            </div>
            
        </div>
    )
}
