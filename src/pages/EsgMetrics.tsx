import React, { useState } from 'react'
import Register from '../components/WelcomePage/register';
import Logo from "../images/whiteLogo.png";
import Login from '../components/WelcomePage/login';
import SideNav from '../components/EsgMetrics/SideNav';
import SideContent from '../components/EsgMetrics/SideContent';

const EsgMetricsPage: React.FC = () => {
    return (
        <div style={{background:"white", width:"100%"}}>
            <div style={{ display: "flex"}}>
                <div style={{}}>
                    <SideNav />
                </div>
                <div style={{marginLeft:"20px", overflowX:"auto", width:"100%"}}>
                    <SideContent />
                </div>
            </div>
        </div>
    );
}

export default EsgMetricsPage;