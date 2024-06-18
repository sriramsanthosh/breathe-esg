import { Button, message } from 'antd';
import React, { useEffect, useState } from 'react'
import Globe from "../../images/globe.svg";
import { NavLink, useNavigate } from 'react-router-dom';
import { GithubAuthProvider, GoogleAuthProvider, auth, gitProvider, provider, signInWithEmailAndPassword, signInWithPopup } from '../../firebase';
import {Progress} from 'antd';

interface LoginProps {
    setLoginSwitch: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setLoginSwitch }) => {
    const Navigate = useNavigate();


    

    const handleGoogleSignIn = async () => {
        try {
            message.loading("Signing with Google");
            await signInWithPopup(auth, provider)
                .then((result) => {
                    message.loading("Setting up everything");
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const displayName = result.user.displayName;
                    if (displayName) {
                        localStorage.setItem("displayName", displayName);
                    }
                    if (credential) {
                        const token = credential.accessToken;
                        if (token) {
                            localStorage.setItem("token", token);
                        }
                    }
                    message.success("Login Success");
                    Navigate("/dashboard");
                }).catch((error) => {
                    console.error(error);
                    message.error("Server connection error.. Try Again");
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    const email = error.customData.email;
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    console.error(email);
                    console.error(credential);
                });
        }
        catch (err) {
            console.log(err);
            message.error("Something went wrong..");
        }
    }

    const handleGithubLogin = async () => {
        try {
            message.loading("Signing with Github");
            await signInWithPopup(auth, gitProvider)
                .then((result) => {
                    message.loading("Setting up everything");
                    const credential = GithubAuthProvider.credentialFromResult(result);
                    const displayName = result.user.displayName;
                    if (displayName) {
                        localStorage.setItem("displayName", displayName);
                    }
                    if (credential) {
                        const token = credential.accessToken;
                        if (token) {
                            localStorage.setItem("token", token);
                        }
                    }
                    message.success("Login Success");
                    Navigate("/dashboard");
                }).catch((error) => {
                    console.error(error);
                    message.error("Server connection error.. Try Again");
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    const email = error.customData.email;
                    const credential = GithubAuthProvider.credentialFromError(error);
                    console.error(email);
                    console.error(credential);
                });
        }
        catch (err) {
            console.log(err);
            message.error("Something went wrong..");
        }
    }

    const handleLogin = async () => {
        try {
            message.loading("Submitting..");
            const email = (document.getElementById("email") as HTMLInputElement).value;
            const password = (document.getElementById("password") as HTMLInputElement).value;
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            message.success("Login Success");
            const user = userCredential.user;
            const accessToken = await user.getIdToken();
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("displayName", "User");
            Navigate("/dashboard");
        }
        catch (error: any) {
            console.log(error.code);
            console.log(error);

            if (error.code === "auth/invalid-credential") {
                message.error("Invalid Credentials");
                return;
            }

            if (error.code === "auth/invalid-email") {
                message.error("The provided email is invalid. Please enter a valid email address.");
                return;
            }
            if (error.code === "auth/email-already-exists") {
                message.error("The provided email is already in use. Please use a different email.");
                return;
            }
            if (error.code === "auth/email-already-in-use") {
                message.error("Account already exists. Please log in.");
                setLoginSwitch(true);
                return;
            }
            if (error.code === "auth/user-not-found") {
                message.error("No user found with this email. Please sign up first.");
                return;
            }
            if (error.code === "auth/invalid-password") {
                message.error("The provided password is invalid. It must be at least six characters long.");
                return;
            }
            if (error.code === "auth/wrong-password") {
                message.error("Incorrect password. Please try again.");
                return;
            }
            if (error.code === "auth/too-many-requests") {
                message.error("Too many login attempts. Please try again later.");
                return;
            }
            if (error.code === "auth/id-token-expired") {
                message.error("Your session has expired. Please log in again.");
                return;
            }
            if (error.code === "auth/id-token-revoked") {
                message.error("Your session has been revoked. Please log in again.");
                return;
            }
            if (error.code === "auth/internal-error") {
                message.error("An unexpected error occurred. Please try again later.");
                return;
            }

            // Default case for any other unknown errors
            message.error("An unknown error occurred.");
        }


    }

    const [progressNumber, setProgressNumber] = useState(0);
    const [timeSecs, setTimeSecs] =useState(1000); 


    useEffect(()=>{
        if(progressNumber<80){
            setTimeout(() => {
                progressNumber<50 ?setProgressNumber(progressNumber+1): setProgressNumber(progressNumber+0.1);
            }, 1000);
        }
    });

    // const changeProgress = async()=>{
    //     for(let i = 1; i<=100; i++){
    //         setTimeout(async() => {
    //             await setProgressNumber(i);
                
    //         }, 1000);
    //     }
    // }


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
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} style={{
                zIndex: "2",
                background: "#235E4A",
                borderRadius: "8px",
                position: "relative",
                padding: "50px 40px",
            }}>
                <div >

                <Progress percent={progressNumber} />
                </div>
                <div style={{ fontWeight: "600", lineHeight: "36px", fontSize: "24px" }}>Login</div>
                <div>Enter your registered Email ID to continue</div>
                <div style={{ marginTop: "20px", marginBottom: "10px" }}>Email <span style={{ color: "#CA3C25" }}>*</span></div>
                <input type="email" name="email" id="email" placeholder="Your Email ID" required />
                <div style={{ marginTop: "20px", marginBottom: "10px" }}>Password <span style={{ color: "#CA3C25" }}>*</span></div>
                <input type="password" name="password" id="password" placeholder='Password' required />
                <div className='signUpContainer'>
                    <p onClick={handleGoogleSignIn} className='text-center signUpBox'><i className="fa-brands fa-google"></i> &nbsp; Sign up with Google</p>
                    <p onClick={handleGithubLogin} className='text-center signUpBox'><i className="fa-brands fa-github"></i> &nbsp; Sign up with Github</p>
                    {/* <p className='text-center signUpBox' onClick={()=>setLoginSwitch(false)}><i className="fa-solid fa-hand-pointer"></i> &nbsp; Manual Sign up</p> */}
                </div>
                <div style={{ textAlign: "center", margin: "10px 0" }}> Don't have an account? <span style={{ cursor: "pointer", color: "lightgreen", textDecoration: "underline" }} onClick={() => setLoginSwitch(false)} >Sign Up</span></div>
                <div className='text-center'>Having trouble logging in? <NavLink to="" style={{ color: "lightgreen" }}>Contact Us</NavLink></div>
                <Button type="primary" htmlType='submit' style={{ width: "100%", marginTop: "35px", fontSize: "18px", padding: "20px", fontWeight: "bold" }}>Continue</Button>
            </form>
        </div>
    )
}

export default Login;