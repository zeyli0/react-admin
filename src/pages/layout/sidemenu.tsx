import { Menu, MenuProps } from "antd";
import { createElement, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Icons from "@ant-design/icons";

import menus, {menusType} from '../../router/menus';


function SideMenu() {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedKey, setSelectedKey] = useState("1");

    type MenuItem = Required<MenuProps>['items'][number];
    function getItem(
        label: React.ReactNode,
        key?: React.Key | null,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group',
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            type,
        } as MenuItem;
    }
    const [menuList, setMenuList] = useState<MenuItem[]>([]);

    // 动态渲染 Icon 图标
    const customIcons: { [key: string]: any } = Icons;
    const addIcon = (name: string) => {
        if(!name) { return null; }
        return createElement(customIcons[name]);
    };
    const deepLoopMenu = (menuList: menusType[], newArr: MenuItem[] = []) => {
        menuList.forEach((item: menusType) => {
            if(item.title) {
                if (!item?.children?.length) {
                    return newArr.push(getItem(item.title, item.path, addIcon(item.icon!)));
                }
                newArr.push(
                    getItem(item.title, item.path, addIcon(item.icon!), deepLoopMenu(item.children))
                );
            }
        });
        return newArr;
    };
    const getMenuData = () => {
        const data = menus;
        if(!data) {return ;}
        setMenuList(deepLoopMenu(data));
    };
    useEffect(() => {
        getMenuData();
    }, []);

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
                triggerSubMenuAction="click"
                selectedKeys={[selectedKey]}
                defaultSelectedKeys={['1']}
                items={menuList}
                onClick={handleClick}
            >
            </Menu>
        </>
    );
}

export default SideMenu;