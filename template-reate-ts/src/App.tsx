import { useEffect, useState } from "react";
import logo from "./logo.svg";
import { Routes, Route, Router, Navigate, Outlet } from "react-router-dom";
import "./App.css";
import { routes, RouteProps } from "./route";
import EmptyPage from "./components/404";
import Login from "./page/login";
import Layout from "./Layout";
import { ConfigProvider } from '@arco-design/web-react'
// import <Layout>
// 验证路由，这里的路由只验证菜单的路由或者需要管理权限的路由,函数可以根据需求自定义
export const generateAccessRoute = (route: RouteProps[]) => {
  let authRoute: any = route.filter((item: RouteProps) => {
    if (item.auth == true) {
      if (item.children) {
        generateAccessRoute(item.children);
      } else {
        return item;
      }
    }
  });
  return authRoute;
};

function App() {
  const [count, setCount] = useState(0);
  const [allRoute, setAllRoute] = useState<RouteProps[]>([]);
  useEffect(() => {
    setAllRoute(generateAccessRoute(routes));
    // console.log(generateAccessRoute(routes));
  }, []);
  return (
    <ConfigProvider componentConfig={{ Card: { bordered: false },
    Table:{border:true} }}>
      <div className="App">
        <Routes>
          {/* <Outlet /> */}
          <Route path="/*" element={<Layout route={allRoute} />}>
            {allRoute.map((item) => {
              return (
                <Route
                  key={item.path}
                  path={item.name}
                  element={item.component}
                />
              );
            })}
            {/* <Route path="*" element={<Navigate replace to="/404" />}></Route> */}
          </Route>
          <Route path="/Inner/404" element={<EmptyPage />}></Route>
          <Route path="/404" element={<EmptyPage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<Navigate replace to="/404" />}></Route>
          {/* <Route path="expenses" element={<Expenses />} /> */}
          {/* <Route path="invoices" element={<Invoices />} /> */}
        </Routes>
      </div>
    </ConfigProvider>

  );
}

export default App;
