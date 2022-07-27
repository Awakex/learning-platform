import React, { useEffect, useState } from "react";
import TaskConstructorContainer from "../tasks/task-constructor-container";
import { PLAYER_CONFIG } from "./config/player-config";
import { useParams } from "react-router-dom";
import { SetsAPI } from "../../core/api/sets";
import { toast } from "react-toastify";
import { ISet } from "../../types/ISet";
import { AxiosResponse } from "axios";
import { Spin } from "antd";

const Player = () => {
    let { setId } = useParams();
    const [currentTaskId, setCurrentTaskId] = useState<string | undefined>(undefined);
    const [set, setSet] = useState<ISet | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getSet();
    }, [setId]);

    const getSet = () => {
        if (!setId) {
            toast.error("Ошибка получения комплекта");
            return;
        }

        setIsLoading(true);
        SetsAPI.getSet(setId)
            .then((response: AxiosResponse<ISet>) => {
                setSet(response.data);
                if (response.data.tasks && response.data.tasks[0]) {
                    setCurrentTaskId(response.data.tasks[0]);
                }
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <React.Fragment>
            {isLoading ? (
                <Spin tip="Загрузка..." size={"large"} />
            ) : (
                <React.Fragment>
                    {currentTaskId ? (
                        <React.Fragment>
                            <div style={{ display: "flex" }}>
                                {set?.tasks?.map((task, index) => (
                                    <p
                                        onClick={() => {
                                            setCurrentTaskId(task);
                                            console.log(task);
                                        }}
                                        style={{ marginLeft: 15, cursor: "pointer" }}
                                    >
                                        {index + 1}
                                    </p>
                                ))}
                            </div>
                            <TaskConstructorContainer
                                config={PLAYER_CONFIG}
                                taskIdForLoad={currentTaskId}
                            />
                        </React.Fragment>
                    ) : (
                        <h2>Нет данных</h2>
                    )}
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default Player;
