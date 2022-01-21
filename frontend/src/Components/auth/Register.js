import React,{ useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios"
import validation from 'validator'
import '../../Styles/Register.css'

export default function Register() {

    const[email,setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [verifyPassword, setconPassword] = useState("");

   async function register(){
        if(email.length===0 || !validation.isEmail(email)){
            document.getElementById('mail_error').style.display = "block";
            document.getElementById('password_error').style.display = "none";
            document.getElementById('conPassword_error').style.display = "none";
            document.getElementById('exists').style.display = "none";
        }else if(password.length===0){
            document.getElementById('mail_error').style.display = "none";
            document.getElementById('password_error').style.display = "block";
            document.getElementById('conPassword_error').style.display = "none";
            document.getElementById('exists').style.display = "none";
        }else if(verifyPassword.length === 0 || password!=verifyPassword ){
            document.getElementById('conPassword_error').style.display = "block";
            document.getElementById('mail_error').style.display = "none";
            document.getElementById('password_error').style.display = "none";
            document.getElementById('exists').style.display = "none";
            
        }else{

            try{
                const registreData = {
                    email,
                    password,
                    verifyPassword
                }
    
                await axios.post("http://localhost:8070/user/register",registreData).then(()=>{
                    window.location="/"
                }).catch((err)=>{
                    document.getElementById('exists').style.display = "block";
                    document.getElementById('password_error').style.display = "none";
                    document.getElementById('mail_error').style.display = "none";
                    document.getElementById('conPassword_error').style.display = "none";
                })
    
            }catch(err){
                console.error(err);
            }

        }


        
    }
    

    return (
        <div  id="RegisterPage">
            <div className="row"  id="formreg1">
                <div>

                </div>

                <div id="formreg">
              
                    <h1 id="rtext1">REGISTER</h1>

                    <input type="text" className="form-control" name="fname" id="rtb1" placeholder="Full Name"
                       required/>
                    <div id='space1' style={{padding:10}}></div>
                    
                    <input type="email" className="form-control" name="Email" id="rtb1" placeholder="E-mail Address"
                        onChange={(e)=> setEmail(e.target.value)} value={email} required/>

                    <div id="mail_error" style={{ display: "none", color:"red", marginLeft:0,marginTop:-5 }}>please enter valid email</div><br />
                    
                    <input type="text" className="form-control" name="uname" id="rtb1" placeholder="Username"
                       required/>

                    <div id='space1' style={{padding:10}}></div>

                    <input type="password" className="form-control" name="password1" id="rtb1" placeholder="Password"
                        onChange={(e)=> setpassword(e.target.value)} required/>
                    
                    <div id="password_error" style={{ display: "none", color:"red", marginLeft:0,marginTop:-5 }}>please enter password</div><br />
                    
                    <input type="password" className="form-control" name="password2" id="rtb1" placeholder="Confirm Password"
                    onChange={(e)=> setconPassword(e.target.value)} required/>
                    
                    <div id="conPassword_error" style={{ display: "none", color:"red", marginLeft:0,marginTop:-5, background:"transparent" }}>confirm password doesn't match</div><br />
                    
                    <div id="exists" style={{ display: "none", color:"red", marginLeft:0,marginTop:-30 }}>entered mail address is already exists</div><br />

                    <a href onClick={e=>{register()}} ><div className="btn btn-info6" id="rtext2">Register</div></a>

                    <br></br><br></br>
               
                    <Link to="/" className="regLink" id="rtext4">Already Have an Account</Link>
                </div>
            
               
            </div>

        </div>
    )
}
