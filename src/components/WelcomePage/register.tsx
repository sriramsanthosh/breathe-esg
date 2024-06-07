import { Button, message } from 'antd';
import React, { HtmlHTMLAttributes } from 'react'
import Globe from "../../images/globe.svg";
import { auth, createUserWithEmailAndPassword } from '../../firebase';
import { error } from 'console';
import { useNavigate } from 'react-router-dom';



interface RegisterProps {
  setLoginSwitch: (value: boolean) => void;
}

const Register: React.FC<RegisterProps> = ({ setLoginSwitch }) => {
  const Navigate = useNavigate();
  const handleRegister = async () => {
    try {
      const email = (document.getElementById("email") as HTMLInputElement).value;
      const password = (document.getElementById("password") as HTMLInputElement).value;
      const confpassword = (document.getElementById("confirmPassword") as HTMLInputElement).value;
      if (password !== confpassword) {
        message.error("Password not matched");
        return;
      }
      if (password.length < 6) {
        message.error("Password should be at least 6 characters");
        return;
      }
      message.loading("Submitting..");
      const user = await createUserWithEmailAndPassword(auth, email, password);
      message.success("Account created..Please Login");
      setLoginSwitch(true);
    }
    catch(error:any){
      console.log(error.code);
      console.log(error);
  
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
      if (error.code === "auth/weak-password") {
          message.error("The password must be at least six characters long.");
          return;
      }
      if (error.code === "auth/invalid-password") {
          message.error("The provided password is invalid. It must be at least six characters long.");
          return;
      }
      if (error.code === "auth/operation-not-allowed") {
          message.error("Email/password accounts are not enabled. Please enable them in the Firebase Console.");
          return;
      }
      if (error.code === "auth/missing-email") {
          message.error("Email is required to create an account.");
          return;
      }
      if (error.code === "auth/missing-password") {
          message.error("Password is required to create an account.");
          return;
      }
      if (error.code === "auth/internal-error") {
          message.error("An unexpected error occurred. Please try again later.");
          return;
      }
      
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
      <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }} style={{
        zIndex: "2",
        background: "#235E4A",
        borderRadius: "8px",
        position: "relative",
        padding: "50px 40px",
      }}>
        <div style={{ fontWeight: "600", lineHeight: "36px", fontSize: "24px" }}>Sign Up</div>
        <div style={{ textAlign: "right", color: "lightgreen", textDecoration: "underline" }}> <span style={{ cursor: "pointer" }} onClick={() => setLoginSwitch(true)} >Swith to login</span></div>
        <div style={{ marginTop: "20px", marginBottom: "10px" }}>Email <span style={{ color: "#CA3C25" }}>*</span></div>
        <input type="email" name="email" id="email" placeholder="Your Email ID" required />
        <div style={{ marginTop: "20px", marginBottom: "10px" }}>Password <span style={{ color: "#CA3C25" }}>*</span></div>
        <input type="password" name="password" id="password" placeholder='Password' required />
        <div style={{ marginTop: "20px", marginBottom: "10px" }}>Confirm Password <span style={{ color: "#CA3C25" }} >*</span></div>
        <input type="password" name="confirmPassword" id="confirmPassword" placeholder='Password' required />

        <Button className='submit-button' type="primary" htmlType='submit' style={{ width: "100%", marginTop: "35px", fontSize: "18px", padding: "20px" }}>Continue</Button>
      </form>
    </div>
  )
}

export default Register;