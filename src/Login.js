import React,{useState} from 'react';
import axios from 'axios'
import swal from '@sweetalert/with-react'
import google from './Home/google.png'
import LoginGoogle from './Events/LoginGoogle'

function Login(props){
    function loginStateHandler(val,data){
        props.loginStateHandler(val,data)
      }
        const [email,setEmail]=useState("")
        const [pass,setPass]=useState("")
        const [warning,setWarning]=useState("")

        function handleLogin(e){    
        e.preventDefault()
        window.scrollTo(0, 0)
        if(loginFormValidator())
        {
        console.log(email,pass)
        axios.post('https://thepc-one.herokuapp.com/api/user/login',
        {
            email:email,
            password:pass
        })
        .then((response) => {
            console.log(response);
            if(response.status===200)
            setWarning("")
            loginStateHandler(true,response.data)
            swal("Logged In", "Successfully!", "success",{
                button:false,
                timer:2000,
            });
            // sessionStorage.setItem('item', 'Logged In');
        }, (error) => {
            console.log(error);
            setWarning("Incorrect Username or Password")
        });
        }}
        
        function loginFormValidator(){
            let flag=true
            // if((/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)==false)
            if(email.length===0)
            {   setWarning("Email ID Invalid")
                flag=false  }
            else if(pass.length===0)
            {   setWarning("Password Invalid")
                flag=false  }
            return flag 
        }

        return(
            
                <div className="sidebar_form">
                <form className="form-signin">
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control custom-control custom-controlTwo borderRadius" placeholder="Email address" onChange={e=>setEmail(e.target.value)} required/>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control custom-control borderRadius " placeholder="Password" onChange={e=>setPass(e.target.value)} required/>
                    <p>{warning}</p>
                    <button className="btn btn-lg btn-block login-button" type="button" onClick={handleLogin}>Login</button>
                    <div className="googleText">OR</div>
                    <div className="home_google">
                    {/* <img src={google} onClick={LoginGoogle} /> */}
                    <LoginGoogle loginStateHandler={loginStateHandler}/>
                    </div>

                </form>
                </div>
            
        ) 
}

export default Login;