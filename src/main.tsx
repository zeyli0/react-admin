import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        {/* <App /> */}
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<App />} />
                {/* 其他路由定义 */}
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
