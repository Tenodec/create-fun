import React from "react";
import {
  HeaderProps,
  Layout,
  Avatar,
  Dropdown,
  Menu,
  Message,
  Space,
  Trigger,
  Skeleton,
  Badge,
  AutoComplete
} from "@arco-design/web-react";
import { IconUser, IconNotification } from "@arco-design/web-react/icon";
import {useNavigate} from 'react-router-dom'
import './index.less'
function Popup() {
  return <div className='demo-trigger-popup' style={{ width: 300, backgroundColor: "#fff", padding: "10px", boxShadow: "box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15)" }}>
    <Skeleton />
  </div>;
}
export default function ProHeader() {
const navigate = useNavigate()

  return (
    <Layout.Header className={"pro-header"} >
      <Space  align="center" size={20}>
        <AutoComplete style={{width:150}}/>
        <Trigger position="br" popup={() => <Popup />} trigger={['hover', 'focus']} blurToHide={false} >
          <Badge count={9} dot dotStyle={{ width: 10, height: 10 }}>
            <IconNotification fontSize={32} />
          </Badge>
          {/* <Input style={{ width: 200 }} placeholder='Hover/Focus Me' /> */}
        </Trigger>
        <Dropdown
          trigger='click'
          position="br"
          droplist={
            <Menu
              onClickMenuItem={(key) => {
                switch (key) {
                  case "setting":
                    Message.info(key);
                    break;
                  case "logout":
                    navigate("/login")
                    break;
                  default:
                }
              }}
            >
              <Menu.Item key="setting">个人设置</Menu.Item>
              {/* <Menu.Item key="Shanghai">Shanghai</Menu.Item> */}
              <Menu.Item key="logout">退出</Menu.Item>
            </Menu>
          }
        >
          <Avatar style={{ backgroundColor: "#3370ff" }}>
            <IconUser />
          </Avatar>
        </Dropdown>
      </Space>
    </Layout.Header>
  );
}
