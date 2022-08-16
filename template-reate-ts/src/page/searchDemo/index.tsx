import React, { ReactNode, useEffect, useState } from 'react'

import {
    Button,
    Checkbox,
    Form,
    Input,
    FormInstance,
    Message,
    Card,
    Table,
    Space,
    Popconfirm
} from "@arco-design/web-react";
import { IconGithub, IconQq } from "@arco-design/web-react/icon";
import SearchForm from './form'
import { TableCol } from './constants'
interface PropsType {
    children?: ReactNode | string
}

export default function SearchDemo(props: PropsType) {

    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        queryData()
    }, [])
    const queryData = async () => {
        setLoading(true)
        await setTimeout(() => {
            setData([{ name: "123123" }])
            setLoading(false)
        }, 2000)

    }
    return (
        <Card >
            <SearchForm onSubmit={()=>{queryData()}} />
            <Table
                loading={loading}
                data={data}
                // pagination={{
                //     pageSize:
                // }}
                columns={[...TableCol, {
                    title: "操作",
                    render: () => {
                        return <Space>
                            <Button size='mini' type='primary'>查看</Button>
                            <Button size='mini' type="primary" status="success">编辑</Button>
                            <Popconfirm title="确认删除？" onOk={() => { Message.success("删除") }} onCancel={() => { Message.warning('cancel') }}>
                                <Button size='mini' type="primary" status="danger">删除</Button>
                            </Popconfirm>
                        </Space>
                    }
                }]}
            />
        </Card>
    )
}
