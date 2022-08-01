import { Button, Modal } from "antd";
import React, { ReactNode } from "react";

interface IProps {
    children: ReactNode;
    isVisible: boolean;
    setIsVisible: (payload: boolean) => void;
    handleOk?: () => void;
    okText?: string;
    title: string;
    width?: number;
}

const ModalLayout = ({
    isVisible,
    children,
    setIsVisible,
    title,
    handleOk,
    okText,
    width,
}: IProps) => {
    return (
        <Modal
            title={title}
            centered
            visible={isVisible}
            onCancel={() => setIsVisible(false)}
            onOk={handleOk}
            okText={okText}
            cancelText={"Отмена"}
            width={width}
            footer={
                !handleOk
                    ? null
                    : [
                          <Button key="submit" type={"default"} onClick={() => setIsVisible(false)}>
                              Отмена
                          </Button>,
                          <Button key="handleOk" type={"primary"} onClick={handleOk}>
                              ОК
                          </Button>,
                      ]
            }
        >
            {children}
        </Modal>
    );
};

export default ModalLayout;
