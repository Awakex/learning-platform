import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import Column from "antd/lib/table/Column";
import { Link } from "react-router-dom";
import { SetsAPI } from "../../core/api/sets";
import { RoutePaths } from "../../routers";

const SetsTable = () => {
    const [dataSource, setDataSource] = useState(undefined);

    const getTasks = () => {
        SetsAPI.getSets().then((response) => {
            setDataSource(response.data);
        });
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <Table dataSource={dataSource} rowKey={(record) => record._id}>
            <Column title="ID" dataIndex="_id" />
            <Column title="Название" dataIndex="title" />
            <Column
                title="Действия"
                render={(_: any, record: any) => (
                    <Space size="middle">
                        <Link to={RoutePaths.SETS.EDIT.replace(":id", record._id)}>
                            Редактировать
                        </Link>
                    </Space>
                )}
            />
        </Table>
    );
};

export default SetsTable;
