import {
  Button,
  Checkbox,
  Form,
  Input,
  FormInstance,
  Message,
} from "@arco-design/web-react";
import { IconGithub, IconQq } from "@arco-design/web-react/icon";
import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const [formRef] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    console.log(location.search);
  }, []);
  const userLogin = async (value: any) => {
    if(value.username!="admin"){
      Message.error("账号密码错误")
    }
    setLoading(true)
    await setTimeout(() => { navigate("/") }, 2000)
    setLoading(false)
    console.log(value);
  }
  // const formRef = useRef();
  // const formRef: FormInstance = useRef();
  return (
    <div
      style={{
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10%",
      }}
    >
      <h2>Admin system</h2>
      <Form
        form={formRef}
        style={{ width: 400 }}
        onSubmit={userLogin}
      >
        <Form.Item
          label="用户名"
          field="username"
          placeholder="admin"
          rules={[
            {
              required: true,
              message: "请输入用户名",
            },
          ]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          label="密码"
          field="password" placeholder="admin"
          rules={[
            {
              required: true,
              message: "请输入密码",
            },
          ]}
        >
          <Input.Password></Input.Password>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 5 }} style={{ textAlign: "left" }}>
          <Checkbox>记住用户名</Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 5 }} style={{ textAlign: "left" }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            onClick={async (value) => {
              if (formRef) {
                try {
                  await formRef?.validate();
                  // Message.info("校验通过，提交成功！");
                  // Message
                } catch (error) {
                  // console.log(formRef.getFieldsError());
                  // Message.error("校验失败，请检查字段！");
                }
              }
            }}
          >
            登录
          </Button>
        </Form.Item>
        {/* <Form.Item wrapperCol={{ offset: 5 }}>
          <IconGithub fontSize={28} />
          or
          <IconQq fontSize={28} color="blue" />
        </Form.Item> */}
      </Form>
    </div>
  );
}
