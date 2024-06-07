import React, { useState } from 'react';
import {
    ContainerOutlined,
    PieChartOutlined,
    DashboardOutlined,
    WindowsOutlined,
    LogoutOutlined,
    DatabaseOutlined,
    ControlOutlined,
    FundOutlined,
    RiseOutlined,
    LeftCircleOutlined,
    RightCircleOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, message } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

interface CustomMenuItem {
    key: string;
    icon: React.ReactNode;
    label: string;
}

const items: CustomMenuItem[] = [
    { key: '1', icon: <DashboardOutlined />, label: 'Dashboard' },
    { key: '2', icon: <WindowsOutlined />, label: 'Entry Manager' },
    { key: '3', icon: <DatabaseOutlined />, label: 'Data Manager' },
    { key: '4', icon: <ContainerOutlined />, label: 'Reporting' },
    { key: '5', icon: <PieChartOutlined />, label: 'Materiality' },
    { key: '6', icon: <ControlOutlined />, label: 'Suppliers' },
    { key: '7', icon: <FundOutlined />, label: 'Analytics' },
    { key: '8', icon: <RiseOutlined />, label: 'Targets' },
    { key: '9', icon: <LogoutOutlined />, label: 'Logout' },
];

const SideNav: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const Navigate = useNavigate();
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        const clickedItem = items.find(item => item.key === e.key);
        if (clickedItem && clickedItem.key==='9') {
            message.success("Logout Success");
            localStorage.clear();
            Navigate("/");
        }
    };

    const menuItems: MenuItem[] = items.map(item => ({
        key: item.key,
        icon: item.icon,
        label: item.label,
    }));

    return (
        <div className='sideNavContainer' style={{ maxWidth: "fit-content", position: "relative", background: "#001529", minHeight: "100vh" }}>
            <div style={{
                backgroundColor: "#001529",
                paddingBottom: "20px"
            }}>

            </div>
            <div id='BlogoText' style={{
                backgroundColor: "#001529",
                paddingBottom: "20px"
            }}>
                {!collapsed ? <NavLink to=""><img style={{ width: "130px", margin: "20px" }} src={require("../../images/whiteLogoNoBg.png")} alt="" /></NavLink> : <NavLink to=""><img style={{ width: "30px", margin: "30px", marginRight: "0" }} src={require("../../images/BlogoNoBg.png")} alt="" /></NavLink>}
            </div>
            <div id="BlogoIcon">
                {collapsed ? <RightCircleOutlined onClick={toggleCollapsed} style={{
                    marginBottom: 16,
                    position: "absolute",
                    top: "90px",
                    left: "72px",
                    backgroundColor: "#001529",
                    color: "white",
                    borderRadius: "50%"
                }} /> :
                    <LeftCircleOutlined onClick={toggleCollapsed} style={{
                        marginBottom: 16,
                        position: "absolute",
                        top: "65px",
                        left: "162px",
                        backgroundColor: "#001529",
                        color: "white",
                        borderRadius: "50%"
                    }} />
                }

                <Menu
                    defaultSelectedKeys={['3']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    items={menuItems}
                    onClick={handleMenuClick}
                />
            </div>
        </div>
    );
};

export default SideNav;
