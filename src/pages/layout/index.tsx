// import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import { Layout, Button, theme } from 'antd';
const { Header, Sider, Content } = Layout;
import SideMenu from './sidemenu';

import { updateCollapse } from "../../redux/modules/menuSlice";


function Index(props: any) {
    console.log('props---', props);
    const dispatch = useDispatch();
    // todo
    // const collapsedVal = useSelector((state:any) => state.collapsed);
    // const [collapsed, setCollapsed] = useState(collapsedVal.collapsed);
    const { collapsed } = props;

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    // 监听窗口大小变化
    // const listeningWindow = () => {
    //     window.onresize = () => {
    //         return (() => {
    //             const screenWidth = document.body.clientWidth;
    //             if (!collapsed && screenWidth < 1200) {dispatch(updateCollapse(true));}
    //             if (!collapsed && screenWidth > 1200) {dispatch(updateCollapse(false));}
    //         })();
    //     };
    // };
    // useEffect(() => {
    //     listeningWindow();
    // }, []);

    return  (
        <section style={{display: 'flex'}}>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{backgroundColor: ' #001529'}}>
                <div className="demo-logo-vertical" >hello !!</div>
                <SideMenu collapsed={collapsed} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => dispatch(updateCollapse(!collapsed))}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 'calc(100vh - 112px)',
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </section>
    );
}

const mapStateToProps = (state: any) => state.collapsed;
export default connect(mapStateToProps)(Index);