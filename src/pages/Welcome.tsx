import React, { useEffect, useState } from 'react'
import Register from '../components/WelcomePage/register';
import Logo from "../images/whiteLogo.png";
import Login from '../components/WelcomePage/login';
import Footer from '../components/footer';

const AccessPage: React.FC = () => {
    const [switchLogin, setLoginSwitch] = useState(true);

    useEffect(()=>{
        document.title = "Welcome"
    }, [switchLogin]);
    
    return (
        <div style={{
            background: "#21453C",
            minHeight: "100vh",
            color: "white",

        }}>
            <div className='open-sans' style={{
                margin: "auto",
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap"
            }}>
                <div style={{
                    alignContent: "center",
                    minHeight: "100vh"
                }}>
                    <div style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        lineHeight: "18px",
                        marginBottom: "15px"
                    }}>
                        WELCOME TO
                    </div>
                    <div>
                        <img style={{
                            color: "white",
                            width: "345px"
                        }} src={Logo} alt="HorizontalLogo" />
                    </div>
                    <div style={{
                        color: "#9F9F9F",
                        marginTop: "30px",
                        maxWidth: "350px"
                    }}>
                        We help you track your organisations metrics as per the ESG Guidelines
                    </div>
                    <div style={{
                        fontWeight: "400",
                        fontSize: "14px",
                        lineHeight: "21px",
                        marginTop: "50px"
                    }}>
                        Sounds interesting? <span style={{ color: "#4FA556", fontWeight: "600px" }}>Get in touch!</span>
                    </div>
                </div>
                <div style={{
                    alignContent: "center",
                    minHeight: "100vh"
                }}>
                    {!switchLogin ? <Register setLoginSwitch={setLoginSwitch} /> : <Login setLoginSwitch={setLoginSwitch} />}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AccessPage;