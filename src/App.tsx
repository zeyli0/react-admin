import './App.css';
import './assets/style/style.scss';
import RouterIndex from './router';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            {/* <Routes> */}
            {/* <Route path="*" element={<div>app !!!</div>} /> */}
            {/* 其他路由定义 */}
            {/* </Routes> */}
            <RouterIndex />
        </BrowserRouter>
    );
}

export default App;
