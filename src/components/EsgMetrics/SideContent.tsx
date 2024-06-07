import { useState } from "react";
import SimpleTable from "./SimpleTable";
import Footer from "../footer";
import { BellOutlined } from '@ant-design/icons';
import { Button, Divider, Select } from 'antd';
import Avatar from "../../images/avatar.svg";
import "./style.scss";


const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};

const SideContent: React.FC = () => {
    const [contentName, setContentName] = useState("Dashboard");

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
                    <div><i className="fa-solid fa-server"></i> Data Entry</div>&nbsp; &nbsp;
                    <div><i className="fa-solid fa-bullseye"></i> Tracker</div>
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
                    <Button type="primary">Submit for Approval</Button>
                </div>
            </div>
            <SimpleTable />
            <Footer />
        </div>
    )
}

export default SideContent;