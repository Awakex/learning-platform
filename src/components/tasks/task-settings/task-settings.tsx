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
            initialValues={{ remember: true }}
            onFinish={handleSaveSettings}
            autoComplete="off"
            className={styles.TaskSettings}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
        >
            <Form.Item
                label="Рейтинг"
                name="rating"
                rules={[{ required: true, message: "Заполните рейтинг" }]}
                initialValue={settings?.rating}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Идентификатор поиска"
                name="search"
                rules={[{ required: true, message: "Заполните идентификатор поиска" }]}
                initialValue={settings?.search}
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
