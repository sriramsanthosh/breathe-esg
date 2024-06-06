import { Button, message } from 'antd';
import React from 'react'
import Globe from "../../images/globe.svg";
import { NavLink, useNavigate } from 'react-router-dom';


interface LoginProps {
    setLoginSwitch: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setLoginSwitch }) => {
    const Navigate = useNavigate();

    const handleLogin = async()=>{

    }

    return (
        <div style={{
            maxWidth: "420px",
        }}>
            <div style={{
                position: "relative",
                margin: "auto",
                marginTop: "150px",
                justifyContent: "center",
                zIndex: "1",
            }}>
                <img style={{ position: "absolute", left: "0", right: '0', margin: "auto", marginTop: "-130px" }} src={Globe} alt="globe" />
            </div>
            <form onSubmit={(e)=>{e.preventDefault(); handleLogin();}} style={{
                zIndex: "2",
                background: "#235E4A",
                borderRadius: "8px",
                position: "relative",
                padding: "50px 40px",
            }}>
                <div style={{ fontWeight: "600", lineHeight: "36px", fontSize: "24px" }}>Login</div>
                <div>Enter your registered Email ID to continue</div>
                <div style={{ marginTop: "20px", marginBottom: "10px" }}>Email <span style={{ color: "#CA3C25" }}>*</span></div>
                <input type="email" name="email" id="email" placeholder="Your Email ID" />
                <div style={{ marginTop: "20px", marginBottom: "10px" }}>Password <span style={{ color: "#CA3C25" }}>*</span></div>
                <input type="password" name="password" id="password" placeholder='Password' />
                <div className='signUpContainer'>
                    <p className='text-center signUpBox'><i className="fa-brands fa-google"></i> &nbsp; Sign up with Google</p>
                    <p className='text-center signUpBox'><i className="fa-brands fa-github"></i> &nbsp; Sign up with Twitter</p>
                    {/* <p className='text-center signUpBox' onClick={()=>setLoginSwitch(false)}><i className="fa-solid fa-hand-pointer"></i> &nbsp; Manual Sign up</p> */}
                </div>
                <div className='text-center'>Having trouble logging in? <NavLink to="" style={{ color: "lightgreen" }}>Contact Us</NavLink></div>
                <div style={{textAlign:"center",marginTop:"10px", color:"lightgreen", textDecoration:"underline"}}> <span style={{cursor:"pointer"}} onClick={()=>setLoginSwitch(false)} >Swith to Manual Sign Up</span></div>
                <Button type="primary" style={{ width: "100%", marginTop: "35px", fontSize: "18px", padding: "20px", fontWeight:"bold" }} onClick={(e)=>{
                    e.preventDefault();
                    message.success("Login Success");
                    Navigate("/dashboard");
                }}>Continue</Button>
            </form>
        </div>
    )
}

export default Login;