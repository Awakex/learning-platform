import { Modal } from "antd";
import React, { ReactNode } from "react";

interface IProps {
    children: ReactNode;
    isVisible: boolean;
    setIsVisible: (payload: boolean) => void;
    title: string;
}

const ModalLayout = ({ isVisible, children, setIsVisible, title }: IProps) => {
    return (
        <Modal
            title={title}
            centered
            visible={isVisible}
            onCancel={() => setIsVisible(false)}
            footer={null}
        >
            {children}
        </Modal>
    );
};

export default ModalLayout;
