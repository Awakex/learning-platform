import { Space, Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TasksAPI } from "../../core/api/tasks";
import { RoutePaths } from "../../routers";

const TasksTable = () => {
    const [dataSource, setDataSource] = useState(undefined);

    const getTasks = () => {
        TasksAPI.getTasks().then((response) => {
            setDataSource(response.data);
        });
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <Table dataSource={dataSource} rowKey={(record) => record._id}>
            <Column title="ID" dataIndex="_id" />
            <Column title="Вопрос" dataIndex="question" />
            <Column
                title="Действия"
                render={(_: any, record: any) => (
                    <Space size="middle">
                        <Link to={RoutePaths.CONSTRUCTOR.EDIT.replace(":id", record._id)}>
                            Редактировать
                        </Link>
                    </Space>
                )}
            />
        </Table>
    );
};

export default TasksTable;
