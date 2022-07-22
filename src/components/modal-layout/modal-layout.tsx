import { Modal } from "antd";
import React, { ReactNode } from "react";

interface IProps {
    children: ReactNode;
    isVisible: boolean;
    setIsVisible: (payload: boolean) => void;
    handleOk?: () => void;
    okText?: string;
    title: string;
}

const ModalLayout = ({ isVisible, children, setIsVisible, title, handleOk, okText }: IProps) => {
    return (
        <Modal
            title={title}
            centered
            visible={isVisible}
            onCancel={() => setIsVisible(false)}
            onOk={handleOk}
            okText={okText}
            cancelText={"Отмена"}
        >
            {children}
        </Modal>
    );
};

export default ModalLayout;
