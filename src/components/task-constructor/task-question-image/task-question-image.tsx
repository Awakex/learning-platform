import React from "react";
import { REQUEST_CONFIG } from "../../../core/config";
import Dragger from "antd/lib/upload/Dragger";
import { CameraOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";

interface IProps {
    imageName?: string;
    handleLoadQuestionImage: (e: any) => void;
}

const TaskQuestionImage = ({ imageName, handleLoadQuestionImage }: IProps) => {
    return (
        <div className={styles.questionImage}>
            {imageName ? (
                <div className={styles.imageWrapper}>
                    <img src={REQUEST_CONFIG.URL + `/${imageName}`} />
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
