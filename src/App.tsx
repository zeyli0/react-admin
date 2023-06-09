
import './App.css';
import './assets/style/style.scss';
import RouterIndex from './router';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';

function App() {
    const [i18nLocale, setI18nLocale] = useState(zhCN);
    return (
        <BrowserRouter>
            <ConfigProvider locale={i18nLocale}>
                {/* <Routes> */}
                {/* <Route path="*" element={<div>app !!!</div>} /> */}
                {/* 其他路由定义 */}
                {/* </Routes> */}
                <RouterIndex />
            </ConfigProvider>   
        </BrowserRouter>
    );
}

export default App;
