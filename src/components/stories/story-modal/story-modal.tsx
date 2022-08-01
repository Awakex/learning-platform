import { Button, Form, Select, Upload, Image, Input } from "antd";
import React, { useEffect, useState } from "react";
import ModalLayout from "../../modal-layout/modal-layout";
import { InboxOutlined } from "@ant-design/icons/lib";
import { ISubstory } from "../../../types/ISubstory";
import { ISubstoryType } from "../../../types/ISubstoryType";
import { FilesAPI } from "../../../core/api/files";
import { REQUEST_CONFIG } from "../../../core/config";
import { ISubstoryForm } from "../../../types/ISubstoryForm";
import { IStoryAttachSubstory } from "../story";
import { SetsAPI } from "../../../core/api/sets";
import { ISet } from "../../../types/ISet";

const { Option } = Select;

interface IProps {
    isVisible: boolean;
    setIsVisible: (payload: boolean) => void;
    handleSave: (substory: ISubstoryForm, payload?: IStoryAttachSubstory) => void;
    substory?: ISubstory;
    addPayload?: IStoryAttachSubstory;
}

const StoryModal = ({ isVisible, setIsVisible, handleSave, substory, addPayload }: IProps) => {
    const [iconPath, setIconPath] = useState("");
    const [sets, setSets] = useState<ISet[] | undefined>(undefined);
    const [form] = Form.useForm<ISubstoryForm>();
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    const getSets = () => {
        SetsAPI.getSets().then((response) =>
            setSets(response.data.map((r: any) => ({ value: r._id, label: r.title })))
        );
    };

    useEffect(() => {
        getSets();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        if (addPayload) {
            form.resetFields(["type", "substoryId"]);
            setIconPath("");
            return;
        }

        if (!substory) return;

        form.setFieldsValue({
            type: substory.type,
            substoryId: substory._id,
            setId: substory.set,
        });

        setIconPath(substory.icon);
    }, [substory, addPayload, isVisible]);

    const uploadImage = async (options: any) => {
        const { file } = options;
        FilesAPI.createFile(file).then((response) => {
            setIconPath(response.data);
        });
    };

    const handleOnFinish = (substory: ISubstoryForm) => {
        substory.icon = iconPath;
        handleSave(substory, addPayload);
    };

    return (
        <ModalLayout
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            title={"Подсюжет"}
            width={800}
        >
            <Form name="substory" {...formItemLayout} onFinish={handleOnFinish} form={form}>
                <Form.Item label="ID подсюжета" name="substoryId">
                    <Input disabled={true} />
                </Form.Item>

                <Form.Item
                    name="setId"
                    label="Тип"
                    hasFeedback
                    rules={[{ required: true, message: "Пожалуйста выберите комплект!" }]}
                >
                    <Select placeholder="Выберите комплект" showSearch optionFilterProp="children">
                        {sets?.map((set: any) => (
                            <Option key={set.value} value={set.value}>
                                {set.label}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="type"
                    label="Комплект"
                    hasFeedback
                    rules={[{ required: true, message: "Пожалуйста выберите тип подсюжета!" }]}
                    initialValue={1}
                >
                    <Select placeholder="Выберите тип подсюжета">
                        <Option value={1}>{ISubstoryType[1]}</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Иконка">
                    <Form.Item name="icon" noStyle>
                        {iconPath ? (
                            <Image
                                width={150}
                                src={REQUEST_CONFIG.URL + `/${iconPath}`}
                                preview={false}
                            />
                        ) : (
                            <React.Fragment>
                                <Upload.Dragger
                                    name="icon"
                                    multiple={false}
                                    showUploadList={false}
                                    customRequest={uploadImage}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">
                                        Кликните или перетащите изображение для загрузки
                                    </p>
                                </Upload.Dragger>
                            </React.Fragment>
                        )}
                    </Form.Item>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button
                        type="default"
                        onClick={() => setIsVisible(false)}
                        style={{ marginRight: 10 }}
                    >
                        Отмена
                    </Button>

                    <Button type="primary" htmlType="submit" disabled={!iconPath}>
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </ModalLayout>
    );
};

export default StoryModal;
