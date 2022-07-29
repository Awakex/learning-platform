import React, { useEffect, useState } from "react";
import { ItemsAPI } from "../../core/api/items";
import Column from "antd/lib/table/Column";
import { Space, Table } from "antd";
import { Link } from "react-router-dom";
import { RoutePaths } from "../../routers";
import { IItemRarity } from "../../types/IItemRarity";
import { IItem } from "../../types/IItem";
import { IItemType } from "../../types/IItemType";

const ItemsTable = () => {
    const [dataSource, setDataSource] = useState(undefined);

    const getItems = () => {
        ItemsAPI.getItems().then((response) => setDataSource(response.data));
    };

    useEffect(() => {
        getItems();
    }, []);

    return (
        <Table dataSource={dataSource} rowKey={(record) => record._id}>
            <Column title="ID" dataIndex="_id" />
            <Column title="Название" dataIndex="name" />

            <Column
                title="Редкость"
                render={(_: any, record: IItem) => (
                    <Space size="middle">{IItemRarity[record.rarity]}</Space>
                )}
            />

            <Column
                title="Тип"
                render={(_: any, record: IItem) => (
                    <Space size="middle">{IItemType[record.type]}</Space>
                )}
            />

            <Column
                title="Действия"
                render={(_: any, record: any) => (
                    <Space size="middle">
                        <Link to={RoutePaths.ITEMS.EDIT.replace(":id", record._id)}>
                            Редактировать
                        </Link>
                    </Space>
                )}
            />
        </Table>
    );
};

export default ItemsTable;
