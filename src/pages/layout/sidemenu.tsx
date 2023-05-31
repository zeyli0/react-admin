import { Layout, Menu, MenuProps } from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;

function SideMenu({ menuList }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedKey, setSelectedKey] = useState("1");
    

    useEffect(() => {
        const paths = location.pathname.split('/');
        const newSelectedKey = paths[paths.length - 1];
        setSelectedKey(newSelectedKey);
    }, [location]);

    const handleClick:MenuProps['onClick'] = (e) => {
        console.log('handleClick', e);
        navigate(e.key, { replace: true });
    };

    return (
        <>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[selectedKey]}
                defaultSelectedKeys={['1']}
                onClick={handleClick}
            >
                {
                    menuList.map((menuItem, index) => {
                        if(menuItem.children) {
                            return (
                                <SubMenu key={`sub${index}`}
                                    icon={menuItem.icon}
                                    title={menuItem.title}>
                                    {
                                        menuItem.children.map((child) => {
                                            <Menu.Item key={`${child.path}`}>
                                                <Link to={child.path}>{child.title}</Link>
                                            </Menu.Item>;
                                        })
                                    }
                                </SubMenu>
                            );
                        }
                        return (
                            <Menu.Item
                                key={`${menuItem.path}`}
                                icon={menuItem.icon}
                            >
                                <Link to={menuItem.path}>{menuItem.title}</Link>
                            </Menu.Item>
                        );
                    })
                }
            </Menu>
        </>
    );
}

SideMenu.propTypes = {
    menuList: PropTypes.arrayOf(

    ).isRequired
};

export default SideMenu;