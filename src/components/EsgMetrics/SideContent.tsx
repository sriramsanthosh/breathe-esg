import { HtmlHTMLAttributes, useState } from "react";
import SimpleTable from "./SimpleTable";
import Footer from "../footer";
import { BellOutlined } from '@ant-design/icons';
import { Button, Divider, Select } from 'antd';
import Avatar from "../../images/avatar.svg";
import "./style.scss";
import TrackerContent from "./TrackerContent";


const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};



const SideContent: React.FC = () => {
    const [contentName, setContentName] = useState("View Name");
    const [switchComp, setSwitchComp] = useState(false);

    const handleTab = (temp:number)=>{
        const tab1Div = document.getElementById("tab1")as HTMLDataElement;
        const tab2Div = document.getElementById("tab2")as HTMLDataElement;
        if(temp){
            setSwitchComp(true);
            tab1Div.style.color = "black";
            tab2Div.style.color = "#4CA65B";
            }
            else{
                setSwitchComp(false);
                tab2Div.style.color = "black";
                tab1Div.style.color = "#4CA65B";
        }
    }

    return (
        <div className="sideContent" style={{
            color: "black",
            overflowX: "auto",
            width: "100%",
        }}>
            <div className="navbar" style={{marginTop:"20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap:'wrap' }}>
                <div style={{display:"flex", alignItems:"center", justifyContent:"center", flexWrap:"wrap"}}>
          
                        <img style={{ width: "25px", }} src={require("../../images/BlogoNoBg.png")} alt="" />
                    
                    <div>{contentName}</div>
                    <div>
                        <Select
                            defaultValue="northIndia"
                            style={{ width: "fit-content" }}
                            onChange={handleChange}
                            options={[
                                { value: 'northIndia', label: 'North India Region' },
                                { value: 'southIndia', label: 'South India Region' },
                                { value: 'northEastIndia', label: 'North-East India Region' },
                            ]}
                        />
                    </div>

                </div>
                <div>
                    <div style={{ display: "flex", alignItems: "center", flexWrap:"wrap" }}>
                        <div>
                            <BellOutlined />
                        </div>
                        <div>
                           Hi, {localStorage.getItem("displayName")}
                        </div>
                        <div>
                            <img src={Avatar} alt="avatar-icon" />
                        </div>
                    </div>
                </div>

            </div>
            <Divider />
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", }}>
                <div style={{ display: "flex" }}>
                    <div style={{color:"#4CA65B"}} className="internal-tabs" id="tab1" onClick={()=>{handleTab(0);}}><i className="fa-regular fa-building"></i> DATA ENTRY</div>&nbsp; &nbsp;
                    <div className="internal-tabs" id="tab2" onClick={()=>{handleTab(1);}}><i className="fa-solid fa-bullseye"></i> TRACKER</div>
                </div>
                <div>For: <Select
                    defaultValue="2324"
                    style={{ width: "fit-content" }}
                    onChange={handleChange}
                    options={[
                        { value: '2324', label: 'FY 2023-24' },
                        { value: '2223', label: 'FY 2022-23' },
                        { value: '2122', label: 'FY 2021-22' },
                    ]}
                /> &nbsp;
                    {!switchComp && <Button type="primary">Submit for Approval</Button>}
                </div>
            </div>
            {switchComp? <TrackerContent/>: <SimpleTable />}
            <Footer />
        </div>
    )
}

export default SideContent;