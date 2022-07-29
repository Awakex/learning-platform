import { Button, Form, InputNumber, Select, Space, Spin, Table } from "antd";
import Input from "antd/lib/input/Input";
import React, { useEffect, useState } from "react";
import { ItemsAPI } from "../../core/api/items";
import { IItem } from "../../types/IItem";
import { IItemRarity } from "../../types/IItemRarity";
import { IItemType } from "../../types/IItemType";
import { IReward } from "../../types/IReward";
import styles from "./styles.module.scss";
import Column from "antd/lib/table/Column";
import { Link } from "react-router-dom";
import { RoutePaths } from "../../routers";
const { Option } = Select;

interface IProps {
    handleAddItem: (reward: IReward) => void;
    rewards?: IReward[];
}

const RewardConstructor = ({ handleAddItem, rewards }: IProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState<IItem[] | undefined>(undefined);

    useEffect(() => {
        getItems();
    }, []);

    const getItems = () => {
        setIsLoading(true);
        ItemsAPI.getItems()
            .then((response) => {
                setItems(response.data);
            })
            .finally(() => setIsLoading(false));
    };

    if (isLoading) {
        return <Spin tip="Загрузка..." size={"large"} />;
    }

    return (
        <div className={styles.RewardConstructor}>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={handleAddItem}
                autoComplete="off"
                style={{ marginTop: 20 }}
            >
                <Form.Item
                    name="item"
                    label="Предмет"
                    hasFeedback
                    rules={[{ required: true, message: "Выберите предмет" }]}
                >
                    <Select placeholder="Выбор предмета" showSearch optionFilterProp="children">
                        {items?.map((item) => {
                            return (
                                <Option value={item._id} key={item._id}>
                                    {item.name} // Редкость: {IItemRarity[item.rarity]} // Тип:{" "}
                                    {IItemType[item.type]}
                                </Option>
                            );
                        })}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Шанс выпадения 0-100%"
                    name="dropRate"
                    rules={[{ required: true, message: "Введите шанс выпадения" }]}
                >
                    <InputNumber min={0} max={100} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Добавить
                    </Button>
                </Form.Item>
            </Form>

            <div>
                <h2>Текущие награды</h2>
                {rewards ? (
                    <Table dataSource={rewards} rowKey={(record: any) => record._id}>
                        <Column title="ID" dataIndex="_id" />
                        <Column
                            title="Название"
                            render={(_: any, record: IReward) => (
                                <Space size="middle">{record.item.name}</Space>
                            )}
                        />
                        <Column
                            title="Шанс выпадения"
                            render={(_: any, record: IReward) => (
                                <Space size="middle">{record.dropRate}</Space>
                            )}
                        />
                    </Table>
                ) : (
                    <p>Нет наград для этого комплекта</p>
                )}
            </div>
        </div>
    );
};

export default RewardConstructor;
