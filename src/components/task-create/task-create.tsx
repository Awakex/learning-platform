import React, { useState } from "react";

import { Button, Select } from "antd";
import { TasksAPI } from "../../core/api/tasks";
import { CreateTaskDto } from "../../types/CreateTaskDto";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../routers";
const { Option } = Select;

const TaskCreate = () => {
    let navigate = useNavigate();
    const [selectTaskType, setSelectTaskType] = useState("classic");
    const [isLoading, setIsLoading] = useState(false);

    const handleTaskCreate = () => {
        let dto: CreateTaskDto = {
            type: "ClassicTask",
        };
        setIsLoading(true);
        TasksAPI.createTask(dto)
            .then((response) => {
                setIsLoading(false);
                navigate(RoutePaths.CONSTRUCTOR.EDIT.replace(":id", response.data._id));
            })
            .catch((e) => {
                setIsLoading(false);
                console.log(e);
            });
    };

    return (
        <div>
            <h2>Создание задания</h2>
            <Select defaultValue="classic" onChange={setSelectTaskType}>
                <Option value="classic">Классическое</Option>
            </Select>

            <Button
                style={{ marginLeft: 10 }}
                onClick={handleTaskCreate}
                type={"primary"}
                loading={isLoading}
            >
                Создать
            </Button>
        </div>
    );
};

export default TaskCreate;
