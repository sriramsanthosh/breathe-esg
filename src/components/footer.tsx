import { NavLink } from "react-router-dom";

const Footer: React.FC = () => {
    return (
        <div style={{textAlign:"center", padding:"10px 0"}}>
            <div>Copyright © {new Date().getFullYear()}</div>
            <div>Made with 💖 <NavLink style={{color:"lightgreen"}} target="_blank" to="https://linkedin.com/in/sriramsanthosh">Sriram Santhosh</NavLink></div>
        </div>
    )
}

export default Footer;