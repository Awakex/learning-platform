import React from "react";
import ModalLayout from "../modal-layout/modal-layout";

interface IProps {
    isVisible: boolean;
    setIsVisible: (payload: boolean) => void;
    title: string;
}

const ImageModal = ({ isVisible, title, setIsVisible }: IProps) => {
    return (
        <ModalLayout isVisible={isVisible} setIsVisible={setIsVisible} title={title}>
            test
        </ModalLayout>
    );
};

export default ImageModal;
