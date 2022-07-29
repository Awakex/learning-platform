import React from "react";
import { IItem } from "../../../types/IItem";
import styles from "../../sets/styles.module.scss";
import { Button, Form, Input, Select } from "antd";
import { IItemType } from "../../../types/IItemType";
import { IItemRarity } from "../../../types/IItemRarity";
const { Option } = Select;

interface IProps {
    item: IItem | undefined;
    handleSaveItem: (item: IItem) => void;
}

const ItemConstructor = ({ item, handleSaveItem }: IProps) => {
    return (
        <div>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={handleSaveItem}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                autoComplete="off"
                className={styles.SetConstructorForm}
            >
                <Form.Item
                    label="Название предмета"
                    name="name"
                    initialValue={item?.name}
                    rules={[{ required: true, message: "Заполните поле названия предмета" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="rarity"
                    label="Редкость"
                    hasFeedback
                    rules={[{ required: true, message: "Выберите редкость предмета!" }]}
                    initialValue={item?.rarity}
                >
                    <Select onChange={(e) => console.log(e)} placeholder="Выбор редкости предмета">
                        <Option value={0}>{IItemRarity[0]}</Option>
                        <Option value={1}>{IItemRarity[1]}</Option>
                        <Option value={2}>{IItemRarity[2]}</Option>
                        <Option value={3}>{IItemRarity[3]}</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="type"
                    label="Тип"
                    hasFeedback
                    rules={[{ required: true, message: "Выберите тип предмета!" }]}
                    initialValue={item?.type}
                >
                    <Select placeholder="Выбор типа предмета">
                        <Option value={0}>{IItemType[0]}</Option>
                        <Option value={1}>{IItemType[1]}</Option>
                    </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className={styles.SetConstructorButton}
                        size={"middle"}
                    >
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ItemConstructor;
