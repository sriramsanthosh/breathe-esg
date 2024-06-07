import React, { useState } from 'react'
import Register from '../components/WelcomePage/register';
import Logo from "../images/whiteLogo.png";
import Login from '../components/WelcomePage/login';
import SideNav from '../components/EsgMetrics/SideNav';
import SideContent from '../components/EsgMetrics/SideContent';
import { NavLink} from 'react-router-dom';
import { Divider } from 'antd';

const EsgMetricsPage: React.FC = () => {
    document.title = "ESG Metrics: Environment - Water"
    return (
        <div>
            {localStorage.getItem("displayName") ? <div style={{ background: "white", width: "100%" }}>
                <div style={{ display: "flex" }}>
                    <div style={{backgroundColor: "#001529",}}>
                        <SideNav />
                    </div>
                    <div style={{ marginLeft: "20px", overflowX: "auto", width: "100%" }}>
                        <SideContent />
                    </div>
                </div>
            </div> : <h3 style={{textAlign:"center"}}>Please signin to access. <NavLink style={{color:"lightgreen"}} to="/">Login</NavLink></h3>}
        </div>
    );
}

export default EsgMetricsPage;