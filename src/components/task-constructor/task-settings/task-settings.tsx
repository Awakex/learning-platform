import { Button, Form, Input } from "antd";
import React from "react";
import { ITaskSettings } from "../../../types/ITaskSettings";
import styles from "./styles.module.scss";

interface IProps {
    handleSaveSettings: (payload: TaskSettingsDto) => void;
    settings: ITaskSettings | undefined;
}

const TaskSettings = ({ handleSaveSettings, settings }: IProps) => {
    return (
        <Form
            name="basic"
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 12 }}
            initialValues={{ remember: true }}
            onFinish={handleSaveSettings}
            autoComplete="off"
            className={styles.TaskSettings}
        >
            <Form.Item
                label="Рейтинг"
                name="rating"
                rules={[{ required: true, message: "Please input your username!" }]}
                initialValue={settings?.rating}
            >
                <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 7, span: 12 }}>
                <Button type="primary" htmlType="submit">
                    Сохранить
                </Button>
            </Form.Item>
        </Form>
    );
};

export default TaskSettings;
