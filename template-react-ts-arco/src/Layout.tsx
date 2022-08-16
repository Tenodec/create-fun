import React, { useEffect, useState } from "react";
import { Outlet, useParams, useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, Spin, Alert } from "@arco-design/web-react";
import { IconCaretRight, IconCaretLeft,IconApps } from '@arco-design/web-react/icon'
import ProHeader from "./components/Layout/Header";
import { generateAccessRoute } from "./App";
import { routes,MenuRoute,AllRoute } from "./route";
import { RouteProps } from "./route";
const Sider = Layout.Sider;
// const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;
const redirect = () => {
  return true;
  // return localStorage.getItem("login");
  // retrun
};
export default function layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [allRoute, setAllRoute] = useState<RouteProps[]>([]);
  const [defaultMenu, setDefaultMenu] = useState("")

  useEffect(() => {
    setAllRoute(generateAccessRoute(routes));
    // console.log(MenuRoute);
    // console.log(AllRoute);
  }, []);
  // 监听路由，刷新后高亮左侧菜单栏
  useEffect(() => {
    console.log(location.pathname);
    setDefaultMenu(location.pathname)
    // allRoute.some((item)=>{
    //   if(item.type!="page"){
    //     navigate(item.path)
    //   }
    // })
  }, [])

  useEffect(() => {
    if (redirect()) {
      setPageLoading(false);
    } else {
      setTimeout(() => {
        setPageLoading(false);
        let fromUrl = "";
        if (location.pathname == "/") {
        } else {
          fromUrl = "?from=" + location.pathname;
        }
        navigate(`/login${fromUrl}`, {
          replace: true,
        });
      }, 3000);
    }
  }, []);
  useEffect(() => {
    if (allRoute.length != 0) {
      generateMenu(allRoute)
    }
  }, [allRoute])
  // useEffect(()=>{})
  // generateAccessRoute(routes);
  const generateMenu = (routes: RouteProps[] | any[]) => {
    // if(routes)
    return routes.map((item, index) => {
      if (item.type == "page") {
      } else {
        if (item.children) {
          return <Menu.SubMenu key={item.path}>{generateMenu(item.children)}</Menu.SubMenu>;
        } else {
          return <Menu.Item key={item.path}><IconApps />{item.name}</Menu.Item>;
        }
      }
    });
  };
  return (
    <>
      {pageLoading == true && <Spin />}
      {pageLoading == false && (
        <Layout style={{ height: "100%" }} className="pro-layout">
          <Sider
            style={{ paddingRight: 8,paddingLeft: 8, boxSizing: "border-box" }}
            collapsible
            trigger={collapsed ? <IconCaretRight /> : <IconCaretLeft />}
            onCollapse={()=>{
              setCollapsed(!collapsed)
            }}
          >
            <div className="logo" />
            <Menu
              style={{ height: "calc(100% - 156px )" }}
              defaultSelectedKeys={[defaultMenu]}
              onClickMenuItem={(el) => {
                console.log(el);
                navigate(el);
              }}
            >
              {generateMenu(allRoute)}
            </Menu>
          </Sider>
          <Layout>
            <ProHeader />
            <Content>
              {/* <Alert banner showIcon={false} style={{ backgroundColor: "#3391f9", color: "#fff" }} content={
                ""
              } closable /> */}
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  padding: "20px",
                  boxSizing: "border-box",
                }}
              >
                <Outlet />
              </div>
              {/* 1<Outlet/> */}
            </Content>
          </Layout>
        </Layout>
      )}
    </>
  );
}
