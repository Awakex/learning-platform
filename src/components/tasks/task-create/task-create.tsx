import React, { useState } from "react";

import { Button, Select } from "antd";
import { TasksAPI } from "../../../core/api/tasks";
import { CreateTaskDto } from "../../../dtos/CreateTaskDto";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../../routers";
import TasksTable from "../tasks-table/tasks-table";
import { TASK_TYPES } from "../../../types/TaskTypes";

const { Option } = Select;

const TaskCreate = () => {
    let navigate = useNavigate();
    const [selectTaskType, setSelectTaskType] = useState<TASK_TYPES>("ClassicTask");
    const [isLoading, setIsLoading] = useState(false);

    const handleTaskCreate = () => {
        let dto: CreateTaskDto = {
            type: selectTaskType,
        };
        setIsLoading(true);
        TasksAPI.createTask(dto)
            .then((response) => {
                setIsLoading(false);
                navigate(RoutePaths.TASKS.EDIT.replace(":id", response.data._id));
            })
            .catch((e) => {
                setIsLoading(false);
            });
    };

    return (
        <div>
            <h2>Создание задания</h2>
            <Select defaultValue={selectTaskType} onChange={setSelectTaskType}>
                <Option value="ClassicTask">Классическое</Option>
            </Select>

            <Button
                style={{ marginLeft: 10, marginBottom: 20 }}
                onClick={handleTaskCreate}
                type={"primary"}
                loading={isLoading}
            >
                Создать
            </Button>

            <hr style={{ marginBottom: 20 }} />
            <TasksTable />
        </div>
    );
};

export default TaskCreate;
