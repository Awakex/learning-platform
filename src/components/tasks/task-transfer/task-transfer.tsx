import React, { CSSProperties, useEffect, useState } from "react";
import { Button, Transfer } from "antd";
import { TasksAPI } from "../../../core/api/tasks";
import { ITask } from "../../../types/ITask";
import { AxiosResponse } from "axios";
import { ISet } from "../../../types/ISet";

interface IProps {
    className: string;
    set: ISet | undefined;
    listStyle: CSSProperties;
    handleSave: (taskIds: string[]) => void;
}

const TaskTransfer = ({ className, listStyle, handleSave, set }: IProps) => {
    const [tasks, setTasks] = useState<ITask[] | undefined>(undefined);
    const [targetKeys, setTargetKeys] = useState<any[]>([]);

    useEffect(() => {
        if (!tasks) {
            getTasks();
        }
    }, [set?.tasks]);

    const getTasks = () => {
        TasksAPI.getTasks(true).then((response: AxiosResponse<ITask[]>) => {
            let allTasks = response.data.map((task) => {
                return { ...task, key: task._id };
            });

            let existedTasks = allTasks.filter((task) => set?.tasks?.includes(task._id));

            setTasks(allTasks);
            setTargetKeys(existedTasks.map((task) => task._id));
        });
    };

    const handleChange = (newTargetKeys: string[]) => {
        setTargetKeys(newTargetKeys);
    };

    return (
        <div className={className}>
            <Transfer
                dataSource={tasks}
                showSearch
                targetKeys={targetKeys}
                onChange={handleChange}
                render={(item) =>
                    `${item.question} ${item.settings?.search ? `[${item.settings.search}]` : ""}`
                }
                listStyle={listStyle}
                titles={["Задания в базе", "Выбранные задания"]}
                locale={{
                    itemUnit: "Задание",
                    itemsUnit: "Заданий",
                    selectInvert: "Выбрать все кроме выделенного",
                    notFoundContent: "Нет данных",
                    remove: "Убрать",
                    removeAll: "Убрать все",
                    searchPlaceholder: "Поиск",
                    selectAll: "Выбрать все",
                }}
            />

            <Button
                onClick={() => handleSave(targetKeys)}
                type={"primary"}
                style={{ marginTop: 20, width: 200 }}
                size={"large"}
                disabled={set?.tasks?.toString() === targetKeys.toString()}
            >
                Сохранить
            </Button>
        </div>
    );
};

export default TaskTransfer;
