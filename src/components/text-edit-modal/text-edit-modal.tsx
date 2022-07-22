import React, { useEffect, useState } from "react";
import ModalLayout from "../modal-layout/modal-layout";
import TextArea from "antd/es/input/TextArea";

interface IProps {
    isVisible: boolean;
    setIsVisible: (payload: boolean) => void;
    handleSave: (text: string) => void;
    text?: string;
    title: string;
    rows?: number;
}

const TextEditModal = ({ handleSave, text, isVisible, setIsVisible, title, rows = 4 }: IProps) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        if (text) {
            setValue(text);
        }
    }, [isVisible]);

    return (
        <ModalLayout
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            title={title}
            handleOk={() => handleSave(value)}
            okText={"Сохранить"}
        >
            <TextArea rows={rows} value={value} onChange={(e) => setValue(e.target.value)} />
        </ModalLayout>
    );
};

export default TextEditModal;
