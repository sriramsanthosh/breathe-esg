import { Button, message } from 'antd';
import React from 'react'
import Globe from "../../images/globe.svg";
import { NavLink, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, auth, getRedirectResult, provider, signInWithEmailAndPassword, signInWithPopup } from '../../firebase';


interface LoginProps {
    setLoginSwitch: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setLoginSwitch }) => {
    const Navigate = useNavigate();
    const handleGoogleSignIn = async () => {
        message.loading("Signing with Google");
        await signInWithPopup(auth, provider)
            .then((result) => {
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
            });
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
                <div style={{ fontWeight: "600", lineHeight: "36px", fontSize: "24px" }}>Login</div>
                <div>Enter your registered Email ID to continue</div>
                <div style={{ marginTop: "20px", marginBottom: "10px" }}>Email <span style={{ color: "#CA3C25" }}>*</span></div>
                <input type="email" name="email" id="email" placeholder="Your Email ID" />
                <div style={{ marginTop: "20px", marginBottom: "10px" }}>Password <span style={{ color: "#CA3C25" }}>*</span></div>
                <input type="password" name="password" id="password" placeholder='Password' />
                <div className='signUpContainer'>
                    <p onClick={handleGoogleSignIn} className='text-center signUpBox'><i className="fa-brands fa-google"></i> &nbsp; Sign up with Google</p>
                    <p className='text-center signUpBox'><i className="fa-brands fa-github"></i> &nbsp; Sign up with Twitter</p>
                    {/* <p className='text-center signUpBox' onClick={()=>setLoginSwitch(false)}><i className="fa-solid fa-hand-pointer"></i> &nbsp; Manual Sign up</p> */}
                </div>
                <div className='text-center'>Having trouble logging in? <NavLink to="" style={{ color: "lightgreen" }}>Contact Us</NavLink></div>
                <div style={{ textAlign: "center", marginTop: "10px", color: "lightgreen", textDecoration: "underline" }}> <span style={{ cursor: "pointer" }} onClick={() => setLoginSwitch(false)} >Swith to Manual Sign Up</span></div>
                <Button type="primary" htmlType='submit' style={{ width: "100%", marginTop: "35px", fontSize: "18px", padding: "20px", fontWeight: "bold" }}>Continue</Button>
            </form>
        </div>
    )
}

export default Login;