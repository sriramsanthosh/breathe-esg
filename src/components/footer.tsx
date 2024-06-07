import { NavLink } from "react-router-dom";

const Footer: React.FC = () => {
    return (
        <div style={{textAlign:"center", padding:"10px 0"}}>
            <div>Made with 💖 <NavLink style={{color:"#4FA556", fontWeight:"600"}} target="_blank" to="https://linkedin.com/in/sriramsanthosh">Sriram Santhosh</NavLink></div>
            <div>Copyright Sriram © {new Date().getFullYear()}</div>
        </div>
    )
}

export default Footer;