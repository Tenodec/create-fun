import React, { useRef } from 'react'

import {
    Button,
    Checkbox,
    Form,
    FormProps,
    Input,
    FormInstance,
    Message,
    Card,
    Grid,
    Space
} from "@arco-design/web-react";
interface PropsType {
    // children?: ReactNode | string
    onSubmit?: (search?:any) => void
}
const Row = Grid.Row
const Col = Grid.Col
const colSpan = 6
// const
export default function form(props: PropsType) {
    const { onSubmit } = props
    const [form] = Form.useForm()
    return (
        <div>
            <Row>
                <Col span={20}>
                    <Form form={form}>
                        <Row>
                            <Col span={colSpan}>
                                <Form.Item label="名称:" field="name">
                                    <Input></Input>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form></Col>
                <Col span={4}>
                    <Space>
                        <Button type='primary' onClick={() => {
                            onSubmit ? onSubmit(form.getFieldsValue()) : ""
                        }}>查询</Button>
                        <Button onClick={()=>{form.resetFields()}}>重置</Button>
                    </Space>
                </Col>
            </Row>
        </div>
    )
}
