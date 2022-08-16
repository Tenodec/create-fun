import React, { Children, ReactChild, ReactNode, useEffect, useState } from 'react'
import { Modal, ModalProps, Message, Form } from '@arco-design/web-react'
interface ProModalProps {
    modalProps?: ModalProps,
    formData?: object,
    style?: React.CSSProperties,
    title?: string,
    trigger?: ReactNode,
    children?: ReactNode,
    noForm?: boolean,
    onFinish?: (formData?:any) => Promise<boolean>,
    onVisible?: (show: boolean) => void
}

export default function ProModal(props: ProModalProps) {
    const { trigger, children, noForm, onVisible, onFinish, title, style } = props
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const Render = () => {
    const [form] = Form.useForm()
        return <Modal
            title={title}
            visible={show}
            style={style}
            escToExit={false}
            maskClosable={false}
            confirmLoading={loading}
            onConfirm={async () => {
                // setLoading(true)
                if (onFinish) {
                    let res = await onFinish(form.getFieldsValue())
                    // setLoading(false)
                    if (res == true) {
                        setShow(false)
                    }

                } else {
                    setShow(false)
                }

            }
            }
            onCancel={() => setShow(false)}
        >
            {(noForm == true) && <>{children}</>}
            {!noForm && <Form form={form}>{children}</Form>}
        </Modal>
    }
    useEffect(() => {
        onVisible ? onVisible(show) : ""
    }, [show])
    return (
        <>
            <div onClick={() => {
                setShow(true)
            }}>{trigger}</div>
            {show == true &&
                <Render />
            }
        </>
    )
}
