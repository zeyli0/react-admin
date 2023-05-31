import {ReactElement, ReactNode, Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

import {
    HomeOutlined
} from '@ant-design/icons';
import { Spin } from "antd";

// 路由懒加载的封装
const LazyLoad = (path:string) => {
    // 相信你能看懂，我也能看懂，这就是封装了下引入路径嘛，后面不用写views了
    const Comp = lazy(() => import(/* @vite-ignore */`${path}`));
    return (
        <>
            {/* <Suspense fallback={<>加载中...</>}> */}
            <Suspense fallback={<Spin />}>
                <Comp />
            </Suspense>
        </>
    );
};

// import HomeC from '../pages/home'
// 引入方法一
// const Home = lazy(() => import('../pages/home'))

// 引入方法二
// const Home = lazy(async () => {
//   const res = await new Promise<any>((resolve) => {
//     setTimeout(() => {
//       resolve(HomeC)
//     }, 2000)
//   })
//   return {default: res}
// })

// 引入方法三
// const Home = lazy(async () => {
//   type resolveType = {
//     default: FunctionComponent
//   }
//   return new Promise<resolveType>((resolve) => {
//     setTimeout(() => {
//       resolve({
//         default: HomeC
//       })
//     }, 2000)
//   })
// })

// const Record = lazy(() => import('../pages/record'));
// const Detail = lazy(() => import('../pages/detail'));
const Layout = lazy(() => import('../pages/layout'));

export type menusType = {
  path: string;
  name?: string;
  element: ReactNode;
  children?: menusType[];
  title?: string;
  icon?: ReactElement;
  redirect?: string;
  meta?: object;
  exact?: boolean;
}
const menus:menusType[] = [
    {
        path: '/',
        element: <Navigate to="/home/home" replace />
    },
    { 
        path: '/home',
        name: '导览',
        // 这个Layout是属于内容的整体，不能使用懒加载，否则回闪屏
        // element: LazyLoad("/layout"),
        // 如下显示
        element: <Layout />,
        icon: <HomeOutlined />,
        children: [
            {
                path: 'home',
                name: '首页',
                element: LazyLoad('../pages/home')
            },
            {
                path: 'record',
                name: '记录',
                element: LazyLoad('../pages/record')
            },
            {
                path: 'detail',
                name: '详细',
                element: LazyLoad('../pages/detail')
            }
        ]
    },
    {
        path: '/login',
        name: '登录',
        element: LazyLoad('../pages/login')
    },
    {
        path: '/*',
        element: <Navigate to="/login" replace />
    }
    // {
    //   path: '/*',
    //   element: LazyLoad('../pages/nofound')
    // }
    // {
    //   path: '/detail',
    //   title: '系统首页',
    //   icon: <HomeOutlined />,
    //   element: lazy(() => import('../pages/detail'))
    // },
    // {
    //   path: '/record',
    //   element: <Record />,
    //   children: [
    //     {
    //       path: '/detail/:id',
    //       element: <Detail />
    //       // element: (params: RouteParams): React.ReactElement => (
    //       //   <Detail id={params.id} />
    //       // ),
    //     }
    //   ]
    // }
];

export default menus;
