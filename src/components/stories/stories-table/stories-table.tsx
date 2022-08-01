import React, { useEffect, useState } from "react";
import Column from "antd/lib/table/Column";
import { Space, Table } from "antd";
import { StoriesAPI } from "../../../core/api/stories";
import { Link } from "react-router-dom";
import { RoutePaths } from "../../../routers";

const StoriesTable = () => {
    const [dataSource, setDataSource] = useState(undefined);

    const getTasks = () => {
        StoriesAPI.getStories().then((response) => {
            setDataSource(response.data);
        });
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <Table dataSource={dataSource} rowKey={(record) => record._id}>
            <Column title="ID" dataIndex="_id" />
            <Column title="Название" dataIndex="name" />
            <Column
                title="Действия"
                render={(_: any, record: any) => (
                    <Space size="middle">
                        <Link to={RoutePaths.STORIES.EDIT.replace(":id", record._id)}>
                            Редактировать
                        </Link>
                    </Space>
                )}
            />
        </Table>
    );
};

export default StoriesTable;
