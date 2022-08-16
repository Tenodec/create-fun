import React, { useEffect, useState } from 'react'
import ProModal from '@/components/Pro/Modal'
import { Button, Upload } from '@arco-design/web-react'
export default function ModalForm(props: { openType?: "view" | "edit" | "add" }) {

    const { openType } = props
    useEffect(() => {
        switch (openType) {
            case "view":
            case "edit":
                handleInitForm()
                break;
            case "add":
                break
        }
    }, [])
    const handleInitForm = () => {

    }
    const [disable, setDisable] = useState(false)
    return (
        <ProModal
            title='上传文件'
            trigger={<Button>123</Button>}
            onFinish={async () => {
                setTimeout(() => { }, 2000)
                return false
            }}
        >
            <div style={{ marginBottom: "10px", }} className='upload-demo-trigger'>
            <Form.Item label="TEST">
                <Input></Input>
            </Form.Item>
            </div>
        </ProModal>
    )
}
