import { Menu, MenuProps } from "antd";
import { createElement, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Icons from "@ant-design/icons";

import menus, {menusType} from '../../router/menus';


function SideMenu(props: any) {
    const {collapsed} = props;

    const {pathname} = useLocation();
    const navigate = useNavigate();
    const [selectedKey, setSelectedKey] = useState(pathname);
    const [openKeys, setOpenKeys] = useState<string[]>([]);

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
    // 生成antd menu
    const deepLoopMenu = (menuList: menusType[], newArr: MenuItem[] = []) => {
        menuList.forEach((item: menusType) => {
            if(item.title) {
                if (!item?.children?.length) {
                    if(item.parentPath) {
                        item.path = [item.parentPath, item.path].join('/');
                    }
                    return newArr.push(getItem(item.title, item.path, addIcon(item.icon!)));
                }
                item.children.map(itm => {
                    itm.parentPath = item.parentPath 
                        ? [item.parentPath, item.path].join('/')
                        : item.path.split('/').join('/');
                });
                const key = item.parentPath 
                    ? [item.parentPath, item.path].join('/') 
                    : item.path.split('/').join('/');
                newArr.push(
                    getItem(item.title, 
                        key, 
                        addIcon(item.icon!), deepLoopMenu(item.children))
                );
            }
        });
        return newArr;
    };

    // 获取菜单
    const getMenuData = () => {
        const data = menus;
        if(!data) {return ;}
        const temp_menus = JSON.parse(JSON.stringify(data));
        const getMenus = deepLoopMenu(temp_menus);
        setMenuList(getMenus);
    };
    useEffect(() => {
        getMenuData();
    }, []);

    const getOpenKeys = (path: string) => {
        let newStr = "";
        const newArr: any[] = [];
        const arr = path.split("/").map(i => "/" + i);
        for (let i = 1; i < arr.length - 1; i++) {
            newStr += arr[i];
            newArr.push(newStr);
        }
        return newArr;
    };
    // 设置key
    useEffect(() => {
        setSelectedKey(pathname);
        collapsed ? null : setOpenKeys(getOpenKeys(pathname));
    }, [pathname, collapsed]);

    // 点击菜单
    const handleClick:MenuProps['onClick'] = (e) => {
        navigate(e.key);
    };
    // 切换菜单open
    const onOpenChange = (openKeys: string[]) => {
        if (openKeys.length === 0 || openKeys.length === 1) {
            return setOpenKeys(openKeys);
        }
        const latestOpenKey = openKeys[openKeys.length - 1];
        if (latestOpenKey.includes(openKeys[0])) {
            return setOpenKeys(openKeys);
        }
        setOpenKeys([latestOpenKey]);
    };

    return (
        <>
            <Menu
                theme="dark"
                mode="inline"
                triggerSubMenuAction="click"
                selectedKeys={[selectedKey]}
                openKeys={openKeys}
                items={menuList}
                onClick={handleClick}
                onOpenChange={onOpenChange}
            >
            </Menu>
        </>
    );
}

export default SideMenu;