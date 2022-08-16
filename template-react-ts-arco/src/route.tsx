import { useRoutes } from "react-router-dom";
import { Suspense, lazy, ReactNode } from "react";
import Login from "@/page/login";
import SearchDemo from "@/page/searchDemo";
import Dashboard from "@/page/dashboard";
export interface RouteProps {
  path: string;
  name: string;
  auth?: boolean;
  type?:"page"|"menu",
  component: ReactNode;
  children?: RouteProps[];
}
export const routes: RouteProps[] = [
  {
    path: "/login",
    auth: true,
    name: "login",
    type:"page",
    // component: () => import('@/page/login')
    component: <Login></Login>,
    // children:[]
  },
  {
    path: "/searchdemo",
    auth: true,
    name: "searchdemo",
    component: <SearchDemo></SearchDemo>,
  },
  {
    path: "/dashboard",
    auth: true,
    name: "dashboard",
    component: <Dashboard></Dashboard>,
  },
];

//根据路径获取路由
const checkAuth = (routers: any, path: String) => {
  for (const data of routers) {
    if (data.path == path) return data;
    if (data.children) {
      const res: any = checkAuth(data.children, path);
      if (res) return res;
    }
  }
  return null;
};
// 路由处理方式
const generateRouter = (routers: any) => {
  return routers.map((item: any) => {
    if (item.children) {
      item.children = generateRouter(item.children);
    }
    item.element = item.component;
    //     <div>加载中...</div>
    //   }>
    //     // {/* 把懒加载的异步路由变成组件装载进去 */}

    // </Suspense>
    return item;
  });
};
const generateAccessRoute = (route: RouteProps[]) => {
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
const generateMenuRoute = (route: RouteProps[])=>{
  let authRoute: any = route.filter((item: RouteProps) => {
    if (item.type != "page") {
      if (item.children) {
        return item.children = generateAccessRoute(item.children);
      } else {
        return item;
      }
    }
  });
  return authRoute;
}
export const AllRoute: any = ()=> {return generateAccessRoute(routes)}
export const MenuRoute = ()=> generateMenuRoute(AllRoute)
const Router = () => useRoutes(generateRouter(routes));
const checkRouterAuth = (path: String) => {
  let auth = null;
  auth = checkAuth(routes, path);
  return auth;
};
export { Router, checkRouterAuth };
