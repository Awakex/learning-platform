import React from "react";
import { REQUEST_CONFIG } from "../../../core/config";
import Dragger from "antd/lib/upload/Dragger";
import { CameraOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import ActionButtons from "../../action-buttons/action-buttons";

interface IProps {
    imageName?: string;
    isEdit: boolean;
    handleLoadQuestionImage: (e: any) => void;
    handleDeleteQuestionImage: () => void;
}

const TaskQuestionImage = ({
    imageName,
    isEdit,
    handleLoadQuestionImage,
    handleDeleteQuestionImage,
}: IProps) => {
    return (
        <div className={styles.questionImage}>
            {imageName ? (
                <div className={styles.imageWrapper}>
                    <img src={REQUEST_CONFIG.URL + `/${imageName}`} />

                    {isEdit && <ActionButtons handleDelete={handleDeleteQuestionImage} />}
                </div>
            ) : (
                <Dragger
                    showUploadList={false}
                    multiple={false}
                    onChange={(e) => handleLoadQuestionImage(e.file)}
                    beforeUpload={() => {
                        return false;
                    }}
                >
                    <p className="ant-upload-drag-icon">
                        <CameraOutlined />
                    </p>
                    <p className="ant-upload-text">Кликните или перетащите файл</p>
                </Dragger>
            )}
        </div>
    );
};

export default TaskQuestionImage;
